/**
 * 工程文件导入/导出
 * 导出 JSON 包含：模型引用、标注点集（局部坐标）、书签位姿、视图状态
 */
import { PROJECT_FORMAT, type ViewerProject } from '@/types'

export function exportProject(project: ViewerProject): void {
  const json = JSON.stringify(project, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const stamp = new Date().toISOString().slice(0, 19).replaceAll(':', '-')
  a.href = url
  a.download = `artifact-viewer-${stamp}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export function parseProjectFile(file: File): Promise<ViewerProject> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as ViewerProject
        validateProject(data)
        resolve(data)
      } catch (err) {
        reject(err instanceof Error ? err : new Error('工程文件解析失败'))
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsText(file)
  })
}

function validateProject(data: ViewerProject): void {
  if (!data || data.format !== PROJECT_FORMAT) {
    throw new Error('文件格式不匹配：不是文物查看器工程文件')
  }
  if (data.version !== 1) throw new Error(`不支持的工程版本: ${data.version}`)
  if (!Array.isArray(data.annotations)) throw new Error('工程缺少标注点集')
  if (!Array.isArray(data.bookmarks)) throw new Error('工程缺少书签数据')
  for (const a of data.annotations) {
    if (!a.position || !a.normal || !a.id) throw new Error('标注数据损坏')
  }
  for (const b of data.bookmarks) {
    if (!b.pose || !b.pose.position || !b.pose.target) throw new Error('书签位姿数据损坏')
  }
}

/**
 * 从用户选择的目录文件列表中定位 potree metadata.json，
 * 并构造相对路径 -> File 的映射（webkitRelativePath 保留目录结构）。
 */
export function buildPotreeFileMap(files: File[]): { map: Map<string, File>; metadataRel: string } | null {
  const map = new Map<string, File>()
  let metadataRel = ''
  for (const f of files) {
    const rel = (f.webkitRelativePath || f.name).replaceAll('\\', '/')
    map.set(rel, f)
    if (/metadata\.json$/i.test(rel)) {
      // 优先选择层级最浅的 metadata.json（点云根目录）
      if (!metadataRel || rel.split('/').length < metadataRel.split('/').length) metadataRel = rel
    }
  }
  if (!metadataRel) return null
  // 统一去掉顶层目录前缀，使 baseUrl 拼接与相对键一致
  const topPrefix = metadataRel.slice(0, metadataRel.lastIndexOf('/') + 1)
  const trimmed = new Map<string, File>()
  for (const [rel, file] of map) {
    const key = rel.startsWith(topPrefix) ? rel.slice(topPrefix.length) : rel
    trimmed.set(key, file)
  }
  return { map: trimmed, metadataRel: metadataRel.slice(topPrefix.length) }
}

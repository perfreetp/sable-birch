declare module 'troika-three-text' {
  import { Mesh, Color, Material } from 'three'

  export class Text extends Mesh {
    text: string
    font: string | null
    fontSize: number
    color: number | string | Color
    anchorX: 'left' | 'center' | 'right'
    anchorY: 'top' | 'middle' | 'bottom'
    textAlign: 'left' | 'center' | 'right'
    maxWidth: number
    lineHeight: number
    letterSpacing: number
    outlineWidth: number
    outlineColor: number | string | Color
    outlineOpacity: number
    strokeWidth: number
    strokeColor: number | string | Color
    fillOpacity: number
    material: Material
    sync(callback?: () => void): void
    dispose(): void
  }
}

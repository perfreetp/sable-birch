import { useStore } from '../lib/store.ts';

export function Toast() {
  const toast = useStore(s => s.toast);
  if (!toast) return null;
  return (
    <div className={`toast ${toast.kind}`} key={toast.id}>
      {toast.text}
    </div>
  );
}

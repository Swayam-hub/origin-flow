import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'info'

export type Toast = {
  id: string
  title?: string | undefined
  message: string
  type: ToastType
  durationMs?: number | undefined
}

type ToastState = {
  toasts: Toast[]
  show: (toast: Omit<Toast, 'id'>) => string
  dismiss: (id: string) => void
  clear: () => void
}

const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  show: (toast) => {
    const id = uid()
    const durationMs = toast.durationMs ?? 3500

    set((s) => ({ toasts: [...s.toasts, { ...toast, id, durationMs }] }))

    // auto-dismiss
    window.setTimeout(() => {
      get().dismiss(id)
    }, durationMs)

    return id
  },

  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  clear: () => set({ toasts: [] }),
}))

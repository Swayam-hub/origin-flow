import { useToastStore } from '@/zustand/toast.store'

type PromiseMessages<T> = {
  loading: { title?: string; message: string }
  success: { title?: string; message: string | ((data: T) => string) }
  error: { title?: string; message: string | ((err: unknown) => string) }
  durationMs?: number
}

function normalizeMessage<T>(msg: string | ((x: T) => string), x: T): string {
  return typeof msg === 'function' ? msg(x) : msg
}

export const toast = {
  success: (message: string, title = 'Success', durationMs?: number) =>
    useToastStore.getState().show({ type: 'success', title, message, durationMs }),

  error: (message: string, title = 'Error', durationMs?: number) =>
    useToastStore.getState().show({ type: 'error', title, message, durationMs }),

  info: (message: string, title = 'Info', durationMs?: number) =>
    useToastStore.getState().show({ type: 'info', title, message, durationMs }),

  dismiss: (id: string) => useToastStore.getState().dismiss(id),

  promise: async <T>(promise: Promise<T>, messages: PromiseMessages<T>): Promise<T> => {
    const id = useToastStore.getState().show({
      type: 'info',
      title: messages.loading.title ?? 'Working',
      message: messages.loading.message,
      durationMs: messages.durationMs ?? 60_000, // long so it won't auto close
    })

    try {
      const data = await promise

      useToastStore.getState().dismiss(id)
      useToastStore.getState().show({
        type: 'success',
        title: messages.success.title ?? 'Done',
        message: normalizeMessage(messages.success.message, data),
        durationMs: messages.durationMs ?? 3500,
      })

      return data
    } catch (err) {
      useToastStore.getState().dismiss(id)
      useToastStore.getState().show({
        type: 'error',
        title: messages.error.title ?? 'Failed',
        message: normalizeMessage(messages.error.message, err),
        durationMs: messages.durationMs ?? 4500,
      })

      throw err
    }
  },
}

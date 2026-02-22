import { create } from 'zustand'

type UiState = {
  // route top bar
  isRouteLoading: boolean
  startRouteLoading: () => void
  stopRouteLoading: () => void

  // global overlay
  isGlobalLoading: boolean
  loadingText: string | undefined // ✅ change here
  showLoader: (text?: string) => void
  hideLoader: () => void
}

export const useUiStore = create<UiState>((set) => ({
  isRouteLoading: false,
  startRouteLoading: () => set({ isRouteLoading: true }),
  stopRouteLoading: () => set({ isRouteLoading: false }),

  isGlobalLoading: false,
  loadingText: undefined,
  showLoader: (text) => set({ isGlobalLoading: true, loadingText: text }),
  hideLoader: () => set({ isGlobalLoading: false, loadingText: undefined }),
}))

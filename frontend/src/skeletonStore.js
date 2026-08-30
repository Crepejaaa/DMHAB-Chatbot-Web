import { ref } from 'vue'

// Global loading state for skeletons.
// Start hidden so the app feels fast, and only show briefly while a route transition occurs.
export const isLoading = ref(false)

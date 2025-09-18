// src/composables/useApi.ts
import { ref } from 'vue'

export function useApi() {
  const fetchData = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return (await response.json()) as T
  }

  return {
    fetchData,
  }
}

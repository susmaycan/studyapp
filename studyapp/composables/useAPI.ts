import type { UseFetchOptions } from 'nuxt/app'

/**
 * A custom hook for making API requests.
 * @template T - The type of the response data.
 * @param {string | (() => string)} url - The URL for the API request.
 * @param {UseFetchOptions<T>} [options] - Additional options for the API request.
 * @returns {UseFetchReturn<T>} - The response data and other useful properties.
 */
export function useAPI<T>(
  url: string | (() => string) | Ref<string> | ComputedRef<string>,
  options?: UseFetchOptions<T>
) {
  const runtime = useRuntimeConfig()

  const fullUrl = runtime.public.API_URL + url
  const useFetchResponse = useFetch(fullUrl, {
    ...options,
    immediate: false,
  })

  return {
    ...useFetchResponse,
    isLoading: computed(() => useFetchResponse.status.value === 'pending'),
  }
}

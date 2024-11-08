export function useFilters() {
  const filters = ref<IFilters>({})
  const route = useRoute()
  const router = useRouter()

  const currentPage = computed(() => filters.value.page || 1)

  watch(
    () => filters.value,
    () => {
      applyFilters()
    },
    {
      deep: true,
    }
  )

  const applyFilters = () => {
    const queryParam = { ...route.query }

    Object.entries(filters.value).forEach(([filterKey, filterValue]) => {
      if (filterValue) {
        queryParam[filterKey] = filterValue as string
      } else {
        delete queryParam[filterKey]
      }
    })

    router.replace({ query: queryParam })
  }

  const getFilters = () => {
    filters.value = { ...route.query }
  }

  const updateFilters = (filterKey: string, filterValue: string) => {
    const newFilters = { ...filters.value, [filterKey]: filterValue, page: '1' }

    filters.value = newFilters
  }

  onBeforeMount(() => {
    getFilters()
  })
  return { filters, currentPage, updateFilters }
}

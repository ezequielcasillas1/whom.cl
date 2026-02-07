import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export function useInfiniteScrollPagination(itemsRef, options = {}) {
  const batchSize = Number(options?.batchSize ?? 3) || 3
  const enabled = computed(() => options?.enabled !== false)

  const limit = ref(batchSize)
  const sentinelEl = ref(null)
  const loadingMore = ref(false)

  const items = computed(() => (itemsRef?.value ? itemsRef.value : []))
  const hasMore = computed(() => items.value.length > limit.value)
  const visibleItems = computed(() => items.value.slice(0, limit.value))

  const supportsObserver =
    typeof window !== 'undefined' && typeof IntersectionObserver !== 'undefined'

  let observer = null

  function reset() {
    limit.value = batchSize
  }

  function loadMore() {
    if (!enabled.value) return
    if (!hasMore.value) return
    limit.value = Math.min(items.value.length, limit.value + batchSize)
  }

  function attachObserver(el) {
    if (!supportsObserver) return
    if (!el) return
    if (!enabled.value) return

    if (!observer) {
      observer = new IntersectionObserver(
        entries => {
          const entry = entries[0]
          if (!entry?.isIntersecting) return
          if (!hasMore.value) return
          loadingMore.value = true
          // next tick not required; keep simple
          loadMore()
          loadingMore.value = false
        },
        { root: null, rootMargin: '600px 0px', threshold: 0 }
      )
    }
    observer.observe(el)
  }

  function detachObserver(el) {
    if (!observer || !el) return
    try {
      observer.unobserve(el)
    } catch {
      // noop
    }
  }

  onMounted(() => {
    attachObserver(sentinelEl.value)
  })

  onBeforeUnmount(() => {
    if (observer) {
      try {
        observer.disconnect()
      } catch {
        // noop
      }
      observer = null
    }
  })

  watch(
    () => sentinelEl.value,
    (next, prev) => {
      if (prev) detachObserver(prev)
      if (next) attachObserver(next)
    }
  )

  watch(
    () => items.value.length,
    () => {
      // keep limit sane when items shrink (filters/sorts)
      limit.value = Math.min(Math.max(batchSize, limit.value), items.value.length || batchSize)
    }
  )

  return {
    batchSize,
    supportsObserver,
    sentinelEl,
    visibleItems,
    hasMore,
    loadingMore,
    reset,
    loadMore
  }
}


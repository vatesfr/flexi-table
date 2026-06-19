import { ref, computed, toValue, type MaybeRefOrGetter } from 'vue'
import {
  processData,
  groupData,
  computeStringValues,
  toggleSort as _toggleSort,
  toggleFilter as _toggleFilter,
  toggleGroupBy,
  toggleCollapse,
  getSortIcon as _getSortIcon,
  getSortIndex as _getSortIndex,
  countActiveFilters,
  DEFAULT_LABELS,
  type SortEntry,
  type RangeFilter,
  type DataTableLabels,
} from '@vates/flexi-table-core'
import type { ColumnDef } from './types'

export interface UseTableStateOptions {
  defaultVisibleColumns?: string[]
  labels?: Partial<DataTableLabels>
}

export function useTableState<TRow extends object>(
  getData: MaybeRefOrGetter<TRow[]>,
  getColumns: MaybeRefOrGetter<ColumnDef<TRow>[]>,
  getOptions?: MaybeRefOrGetter<UseTableStateOptions>,
) {
  const data = computed(() => toValue(getData))
  const columns = computed(() => toValue(getColumns))
  const options = computed(() => toValue(getOptions) ?? {})

  const L = computed(() => ({ ...DEFAULT_LABELS, ...options.value.labels }))

  const visibleCols = ref<Set<string>>(
    new Set(options.value.defaultVisibleColumns ?? columns.value.map(c => c.key)),
  )
  const sorts = ref<SortEntry[]>([])
  const filters = ref<Record<string, Set<string>>>({})
  const rangeFilters = ref<Record<string, RangeFilter>>({})
  const groupBy = ref<string[]>([])
  const collapsedGroups = ref<Set<string>>(new Set())

  const stringValueMap = computed(() => computeStringValues(data.value, columns.value))

  const processedData = computed(() =>
    processData(data.value, filters.value, rangeFilters.value, sorts.value),
  )

  const groupedData = computed(() => groupData(processedData.value, groupBy.value))

  const activeColumns = computed(() =>
    columns.value.filter(c => visibleCols.value.has(c.key) && !groupBy.value.includes(c.key)),
  )

  const activeFilterCount = computed(() =>
    countActiveFilters(filters.value, rangeFilters.value),
  )

  return {
    // Reactive state
    visibleCols,
    sorts,
    filters,
    rangeFilters,
    groupBy,
    collapsedGroups,
    // Computed
    processedData,
    groupedData,
    activeColumns,
    stringValueMap,
    activeFilterCount,
    L,
    // Actions
    toggleColVisibility: (key: string) => {
      const next = new Set(visibleCols.value)
      if (next.has(key)) { if (next.size > 1) next.delete(key) }
      else next.add(key)
      visibleCols.value = next
    },
    toggleSort: (key: string) => { sorts.value = _toggleSort(sorts.value, key) },
    toggleFilter: (key: string, value: string) => {
      filters.value = _toggleFilter(filters.value, key, value)
    },
    setRangeFilter: (key: string, field: 'min' | 'max', value: string) => {
      rangeFilters.value = {
        ...rangeFilters.value,
        [key]: { min: rangeFilters.value[key]?.min ?? '', max: rangeFilters.value[key]?.max ?? '', [field]: value },
      }
    },
    clearColumnFilter: (key: string) => {
      filters.value = { ...filters.value, [key]: new Set() }
    },
    toggleGroup: (key: string) => { groupBy.value = toggleGroupBy(groupBy.value, key) },
    toggleGroupCollapse: (key: string) => {
      collapsedGroups.value = toggleCollapse(collapsedGroups.value, key)
    },
    clearSorts: () => { sorts.value = [] },
    clearFilters: () => { filters.value = {}; rangeFilters.value = {} },
    clearGroups: () => { groupBy.value = []; collapsedGroups.value = new Set() },
    clearAll: () => {
      sorts.value = []
      filters.value = {}
      rangeFilters.value = {}
      groupBy.value = []
      collapsedGroups.value = new Set()
    },
    getSortIcon: (key: string) => _getSortIcon(sorts.value, key),
    getSortIndex: (key: string) => _getSortIndex(sorts.value, key),
  }
}

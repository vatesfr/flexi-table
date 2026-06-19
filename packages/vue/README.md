# @vates/flexi-table-vue

Vue 3 adapter for [flexi-table](../../README.md) — a flexible, fully-typed data table with sorting, filtering, column visibility, and row grouping.

## Install

```bash
npm install @vates/flexi-table-vue
```

Requires Vue ≥ 3.3.

## Usage

```vue
<script setup lang="ts">
import { DataTable, type ColumnDef } from '@vates/flexi-table-vue'

interface Employee { id: number; name: string; department: string; salary: number }

const COLUMNS: ColumnDef<Employee>[] = [
  { key: 'name',       label: 'Name',       type: 'string' },
  { key: 'department', label: 'Department', type: 'string', groupable: true },
  { key: 'salary',     label: 'Salary',     type: 'number',
    format: v => Number(v).toLocaleString() + ' €' },
]
</script>

<template>
  <DataTable :data="employees" :columns="COLUMNS" row-key="id" />
</template>
```

## Custom rendering

Use named scoped slots to customize how cells, filter labels, and group headers render.

```vue
<DataTable :data="employees" :columns="COLUMNS" row-key="id">
  <!-- Custom table cell -->
  <template #cell-department="{ value, row }">
    <Badge :label="String(value)" />
  </template>

  <!-- Custom filter checklist item -->
  <template #filter-department="{ value }">
    <Badge :label="value" />
  </template>

  <!-- Custom group header value (same slot as cell) -->
  <template #group-department="{ value }">
    <Badge :label="String(value)" />
  </template>
</DataTable>
```

Slot naming: `#cell-{key}`, `#filter-{key}`, `#group-{key}` where `{key}` matches the column's `key`.

`#group-{key}` applies to group header rows when that column is used for grouping, so values display with the same visual as table cells.

## `DataTable` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TRow[]` | — | Row data |
| `columns` | `ColumnDef<TRow>[]` | — | Column definitions |
| `rowKey` | `keyof TRow & string` | — | Unique row identifier |
| `defaultVisibleColumns` | `string[]` | all | Initially visible column keys |
| `labels` | `Partial<DataTableLabels>` | French | UI string overrides |

All props accept `MaybeRefOrGetter` — you can pass refs, computed values, or plain values.

## Column definition

```ts
interface ColumnDef<TRow extends object> {
  key: keyof TRow & string
  label: string
  type?: 'string' | 'number' | 'date'  // controls filter UI; default: 'string'
  width?: number
  format?: (value: unknown) => string
  sortable?: boolean     // default: true
  filterable?: boolean   // default: true
  groupable?: boolean    // default: false
}
```

For custom rendering, provide a `#cell-{key}` slot instead of a `render` function.

## `useTableState` composable

If you need to build a custom layout, use the composable directly:

```ts
import { useTableState } from '@vates/flexi-table-vue'

const {
  // Reactive state (refs)
  visibleCols, sorts, filters, rangeFilters, groupBy, collapsedGroups,
  // Computed
  processedData, groupedData, activeColumns, stringValueMap, activeFilterCount, L,
  // Actions
  toggleColVisibility, toggleSort, toggleFilter, setRangeFilter,
  toggleGroup, toggleGroupCollapse, clearColumnFilter,
  clearSorts, clearFilters, clearGroups, clearAll,
  getSortIcon, getSortIndex,
} = useTableState(data, columns, options)
```

`data` and `columns` can be refs, computed values, or plain arrays.

## i18n

```ts
import type { DataTableLabels } from '@vates/flexi-table-core'

const labels: Partial<DataTableLabels> = {
  columns: 'Columns',
  sort: 'Sort',
  filter: 'Filter',
  group: 'Group',
  clearAll: '× Clear all',
  rowCount: (f, t) => `${f} of ${t} row${t !== 1 ? 's' : ''}`,
  groupCount: n => ` · ${n} group${n !== 1 ? 's' : ''}`,
  groupLabel: i => `Group ${i}`,
  rowsInGroup: n => `${n} row${n !== 1 ? 's' : ''}`,
}
```

```vue
<DataTable :labels="labels" ... />
```

## License

MIT

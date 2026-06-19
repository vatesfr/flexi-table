# @vates/flexi-table-react

React adapter for [flexi-table](../../README.md) — a flexible, fully-typed data table with sorting, filtering, column visibility, and row grouping.

## Install

```bash
npm install @vates/flexi-table-react
```

Requires React ≥ 17.

## Usage

```tsx
import { DataTable, type ColumnDef } from '@vates/flexi-table-react'

interface Employee { id: number; name: string; department: string; salary: number }

const COLUMNS: ColumnDef<Employee>[] = [
  { key: 'name',       label: 'Name',       type: 'string' },
  { key: 'department', label: 'Department', type: 'string', groupable: true },
  { key: 'salary',     label: 'Salary',     type: 'number',
    format: v => Number(v).toLocaleString() + ' €' },
]

export default function App() {
  return <DataTable data={employees} columns={COLUMNS} rowKey="id" />
}
```

## Custom rendering

Use the `render` prop on a column for custom cell content, and `renderFilterLabel` for custom filter checklist items.

```tsx
const COLUMNS: ColumnDef<Employee>[] = [
  {
    key: 'department',
    label: 'Department',
    type: 'string',
    groupable: true,
    render: (value, row) => <Badge label={String(value)} />,
    renderFilterLabel: value => <Badge label={value} />,
  },
]
```

`render` also applies to group header values, so grouped columns display with the same badge/visual as table cells.

## `DataTable` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TRow[]` | — | Row data |
| `columns` | `ColumnDef<TRow>[]` | — | Column definitions |
| `rowKey` | `keyof TRow & string` | — | Unique row identifier |
| `defaultVisibleColumns` | `string[]` | all | Initially visible column keys |
| `labels` | `Partial<DataTableLabels>` | French | UI string overrides |

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
  render?: (value: unknown, row: TRow) => ReactNode
  renderFilterLabel?: (value: string) => ReactNode
}
```

Cell value resolution order: `render` → `format` → `String(value)`.

## `useTableState` hook

If you need to build a custom layout, use the hook directly:

```tsx
import { useTableState, type ColumnDef } from '@vates/flexi-table-react'

const {
  // State
  visibleCols, sorts, filters, rangeFilters, groupBy, collapsedGroups,
  // Derived
  processedData, groupedData, activeColumns, stringValueMap, activeFilterCount, L,
  // Actions
  toggleColVisibility, toggleSort, toggleFilter, setRangeFilter,
  toggleGroup, toggleGroupCollapse, clearColumnFilter,
  clearSorts, clearFilters, clearGroups, clearAll,
  getSortIcon, getSortIndex,
} = useTableState(data, columns, defaultVisibleColumns, labelOverrides)
```

## i18n

```tsx
import type { DataTableLabels } from '@vates/flexi-table-core'

const LABELS: Partial<DataTableLabels> = {
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

<DataTable labels={LABELS} ... />
```

## License

MIT

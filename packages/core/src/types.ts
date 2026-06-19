export type SortDir = 'asc' | 'desc'

export interface SortEntry {
  key: string
  dir: SortDir
}

export interface RangeFilter {
  min: string
  max: string
}

export interface ColumnDefBase<TRow extends object = Record<string, unknown>> {
  key: keyof TRow & string
  label: string
  /** Determines filter UI: 'string' → checklist, 'number' → range. Default: 'string' */
  type?: 'string' | 'number' | 'date'
  width?: number
  /** Format a value to a plain string (framework-agnostic alternative to render) */
  format?: (value: unknown) => string
  sortable?: boolean
  filterable?: boolean
  groupable?: boolean
}

export interface DataTableLabels {
  columns: string
  columnsSection: string
  sort: string
  sortSection: string
  clearSorts: string
  filter: string
  numericRanges: string
  min: string
  max: string
  clearFilters: string
  group: string
  groupSection: string
  clearGroups: string
  clearAll: string
  rowCount: (filtered: number, total: number) => string
  groupCount: (count: number) => string
  groupLabel: (index: number) => string
  rowsInGroup: (count: number) => string
}

export const DEFAULT_LABELS: DataTableLabels = {
  columns: 'Colonnes',
  columnsSection: 'Affichage',
  sort: 'Trier',
  sortSection: 'Colonnes à trier',
  clearSorts: '× Effacer les tris',
  filter: 'Filtrer',
  numericRanges: 'Plages numériques',
  min: 'Min',
  max: 'Max',
  clearFilters: '× Effacer les filtres',
  group: 'Grouper',
  groupSection: 'Grouper par',
  clearGroups: '× Effacer les groupes',
  clearAll: '× Tout effacer',
  rowCount: (f, t) => `${f} / ${t} ligne${t > 1 ? 's' : ''}`,
  groupCount: n => ` · ${n} groupe${n > 1 ? 's' : ''}`,
  groupLabel: i => `Groupe ${i}`,
  rowsInGroup: n => `${n} ligne${n > 1 ? 's' : ''}`,
}

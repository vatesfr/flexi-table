<script setup lang="ts">
import { DataTable, Badge, ScoreBar, type ColumnDef } from '@vates/flexi-table-vue'

interface Employee {
  id: number; name: string; department: string; role: string
  salary: number; joined: string; status: string; score: number
}

const SAMPLE_DATA: Employee[] = [
  { id: 1, name: 'Alice Martin', department: 'Engineering', role: 'Senior Dev', salary: 92000, joined: '2019-03-15', status: 'Active', score: 94 },
  { id: 2, name: 'Bob Chen', department: 'Product', role: 'PM', salary: 85000, joined: '2020-07-01', status: 'Active', score: 87 },
  { id: 3, name: 'Clara Dubois', department: 'Engineering', role: 'Lead Dev', salary: 105000, joined: '2017-11-20', status: 'Active', score: 98 },
  { id: 4, name: 'David Kim', department: 'Design', role: 'UX Designer', salary: 78000, joined: '2021-01-10', status: 'Active', score: 82 },
  { id: 5, name: 'Eva Müller', department: 'Engineering', role: 'Junior Dev', salary: 62000, joined: '2023-04-05', status: 'Active', score: 73 },
  { id: 6, name: 'Frank Rossi', department: 'Sales', role: 'Account Exec', salary: 71000, joined: '2020-09-12', status: 'Inactive', score: 65 },
  { id: 7, name: 'Grace Liu', department: 'Product', role: 'Designer', salary: 74000, joined: '2021-06-28', status: 'Active', score: 89 },
  { id: 8, name: 'Hiro Tanaka', department: 'Engineering', role: 'DevOps', salary: 88000, joined: '2018-02-14', status: 'Active', score: 91 },
  { id: 9, name: 'Isabelle Roy', department: 'HR', role: 'HR Manager', salary: 67000, joined: '2019-08-22', status: 'Active', score: 79 },
  { id: 10, name: "James O'Brien", department: 'Sales', role: 'Sales Lead', salary: 82000, joined: '2018-05-03', status: 'Active', score: 84 },
  { id: 11, name: 'Karin Svensson', department: 'Design', role: 'Lead Designer', salary: 86000, joined: '2019-12-01', status: 'Active', score: 92 },
  { id: 12, name: 'Leo Petit', department: 'Engineering', role: 'Architect', salary: 118000, joined: '2016-06-17', status: 'Active', score: 97 },
  { id: 13, name: 'Mia Nakamura', department: 'HR', role: 'Recruiter', salary: 58000, joined: '2022-03-08', status: 'Active', score: 76 },
  { id: 14, name: 'Noel Ferreira', department: 'Sales', role: 'Account Exec', salary: 68000, joined: '2021-10-15', status: 'Inactive', score: 61 },
  { id: 15, name: 'Olivia Smith', department: 'Product', role: 'CPO', salary: 145000, joined: '2015-01-20', status: 'Active', score: 99 },
  { id: 16, name: 'Paul Werner', department: 'Engineering', role: 'Senior Dev', salary: 96000, joined: '2018-09-30', status: 'Active', score: 88 },
  { id: 17, name: 'Qi Zhang', department: 'Design', role: 'UX Researcher', salary: 76000, joined: '2020-11-11', status: 'Active', score: 85 },
  { id: 18, name: 'Rosa García', department: 'HR', role: 'HR Director', salary: 95000, joined: '2016-04-25', status: 'Active', score: 93 },
  { id: 19, name: 'Sam Patel', department: 'Engineering', role: 'CTO', salary: 180000, joined: '2014-08-01', status: 'Active', score: 100 },
  { id: 20, name: 'Tanya Volkov', department: 'Sales', role: 'VP Sales', salary: 135000, joined: '2015-07-14', status: 'Active', score: 96 },
]

const DEPT_COLORS = {
  Engineering: { bg: '#EAF3DE', color: '#3B6D11' }, Product: { bg: '#E6F1FB', color: '#185FA5' },
  Design: { bg: '#FBEAF0', color: '#993556' }, Sales: { bg: '#FAEEDA', color: '#854F0B' },
  HR: { bg: '#EEEDFE', color: '#534AB7' },
}
const STATUS_COLORS = {
  Active: { bg: '#EAF3DE', color: '#3B6D11' }, Inactive: { bg: '#FCEBEB', color: '#A32D2D' },
}

const COLUMNS: ColumnDef<Employee>[] = [
  { key: 'id', label: 'ID', type: 'number', width: 60, filterable: false },
  { key: 'name', label: 'Nom', type: 'string', width: 160 },
  { key: 'department', label: 'Département', type: 'string', width: 130, groupable: true,
    format: v => String(v) },
  { key: 'role', label: 'Rôle', type: 'string', width: 140, groupable: true },
  { key: 'salary', label: 'Salaire', type: 'number', width: 110,
    format: v => Number(v).toLocaleString('fr-FR') + ' €' },
  { key: 'joined', label: 'Arrivée', type: 'date', width: 100, filterable: false },
  { key: 'status', label: 'Statut', type: 'string', width: 90, groupable: true },
  { key: 'score', label: 'Score', type: 'number', width: 80 },
]
</script>

<template>
  <div style="max-width: 1100px; margin: 0 auto; padding: 32px 24px">
    <h1 style="font-size: 20px; font-weight: 600; margin-bottom: 4px">FlexiTable — Vue</h1>
    <p style="font-size: 14px; color: var(--color-text-secondary); margin-top: 0; margin-bottom: 24px">
      @vates/flexi-table-vue
    </p>

    <DataTable :data="SAMPLE_DATA" :columns="COLUMNS" row-key="id">

      <!-- Custom cell rendering via named slots -->
      <template #cell-department="{ value }">
        <Badge :value="String(value)" :color-map="DEPT_COLORS" />
      </template>
      <template #cell-status="{ value }">
        <Badge :value="String(value)" :color-map="STATUS_COLORS" />
      </template>
      <template #cell-score="{ value }">
        <ScoreBar :value="Number(value)" />
      </template>

      <!-- Custom filter labels -->
      <template #filter-department="{ value }">
        <Badge :value="value" :color-map="DEPT_COLORS" />
      </template>
      <template #filter-status="{ value }">
        <Badge :value="value" :color-map="STATUS_COLORS" />
      </template>

      <!-- Custom group header values -->
      <template #group-department="{ value }">
        <Badge :value="String(value)" :color-map="DEPT_COLORS" />
      </template>
      <template #group-status="{ value }">
        <Badge :value="String(value)" :color-map="STATUS_COLORS" />
      </template>

    </DataTable>
  </div>
</template>

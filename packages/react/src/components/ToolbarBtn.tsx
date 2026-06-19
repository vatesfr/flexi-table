import type { ReactNode } from 'react'

export interface ToolbarBtnProps {
  onClick?: () => void
  active?: boolean
  children: ReactNode
  title?: string
}

export function ToolbarBtn({ onClick, active, children, title }: ToolbarBtnProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '5px 10px',
        background: active ? 'var(--color-background-secondary)' : 'transparent',
        border: '0.5px solid var(--color-border-secondary)',
        borderRadius: 6,
        fontSize: 13,
        cursor: 'pointer',
        color: 'var(--color-text-primary)',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

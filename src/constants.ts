import { TailwindCSSOpacity } from './types'

export const defaultOpacities: number[] = [0.1, 0.25, 0.5, 0.8]

export const defaultAttributeTargets: TailwindCSSOpacity.AttributeTarget[] = [
  { label: 'text', attr: 'color' },
  { label: 'border', attr: 'borderColor' },
  { label: 'border-t', attr: 'borderTopColor' },
  { label: 'border-r', attr: 'borderRightColor' },
  { label: 'border-b', attr: 'borderBottomColor' },
  { label: 'border-l', attr: 'borderLeftColor' },
  { label: 'bg', attr: 'backgroundColor' },
  { label: 'fill', attr: 'fill' },
  { label: 'stroke', attr: 'stroke' },
]

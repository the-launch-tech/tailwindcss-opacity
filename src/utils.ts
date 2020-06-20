import * as Constants from './constants'

import { TailwindCSSOpacity } from './types'

export const buildClassName = (
  targetAttr: TailwindCSSOpacity.AttributeTarget,
  previousKeys: string[] | null,
  colorKey: string,
  opacityOption: TailwindCSSOpacity.Option
): string => {
  return `.${targetAttr.label}-${(previousKeys || [])
    .map((prevKey: string): string => prevKey + '-')
    .join('')}${colorKey}-${opacityOption.label}`
}

export const constructClassStyle = (
  targetAttr: TailwindCSSOpacity.AttributeTarget,
  className: string,
  hex: TailwindCSSOpacity.Hex,
  opacityOption: TailwindCSSOpacity.Option
): object | undefined => {
  if (!!hex) {
    const classStyle = {
      [className]: {
        [targetAttr.attr]: `rgba(${hex.r}, ${hex.g}, ${hex.b}, ${opacityOption.value})`,
      },
    }
    return classStyle
  }
  return
}

export function buildOpacityOptions(
  opacities: TailwindCSSOpacity.Params['opacities'] | object,
  themeOpacity?: boolean
): TailwindCSSOpacity.Option[] {
  const option = (item: number): TailwindCSSOpacity.Option => ({
    label: `${item * 1000}`,
    value: item,
  })

  return !themeOpacity
    ? (Array.isArray(opacities) ? opacities : Constants.defaultOpacities).map(
        (item: number): TailwindCSSOpacity.Option => option(item)
      )
    : !!opacities
    ? Object.keys(opacities).map((key: string): TailwindCSSOpacity.Option => option(opacities[key]))
    : []
}

export function hexToRgb(hex: string): TailwindCSSOpacity.Hex {
  const values: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!!values) {
    return { r: parseInt(values[1], 16), g: parseInt(values[2], 16), b: parseInt(values[3], 16) }
  }
  return null
}

export const flattenRecursive = (arr: any): any =>
  arr.reduce((a: any, b: any): any => a.concat(Array.isArray(b) ? flattenRecursive(b) : b), [])

export const flattenUtility = (array: any): any => flattenRecursive(array)

export const validDeepControl = (deepControl: TailwindCSSOpacity.ControlMap): boolean => {
  return true
}

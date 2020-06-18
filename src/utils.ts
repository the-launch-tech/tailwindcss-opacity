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
    const classStyle = {}
    classStyle[className] = {}
    classStyle[className][
      targetAttr.attr
    ] = `rgba(${hex.r}, ${hex.g}, ${hex.b}, ${opacityOption.value})`
    return classStyle
  }
  return
}

export function buildOpacityOptions(
  opacities: TailwindCSSOpacity.Params['opacities']
): TailwindCSSOpacity.Option[] {
  return (opacities || Constants.defaultOpacities).map(
    (item: number): TailwindCSSOpacity.Option => ({
      label: `${typeof item === 'string' ? parseFloat(item) : item * 1000}`,
      value: typeof item === 'string' ? parseFloat(item) : item,
    })
  )
}

export function hexToRgb(hex: string): TailwindCSSOpacity.Hex {
  const values: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!!values) {
    return { r: parseInt(values[1], 16), g: parseInt(values[2], 16), b: parseInt(values[3], 16) }
  }
  return null
}

export const flattenRecursive = (arr: any): any => {
  return arr.reduce((a: any, b: any): any => {
    return a.concat(Array.isArray(b) ? flattenRecursive(b) : b)
  }, [])
}

export const flattenUtility = (array: any): any => {
  return flattenRecursive(array)
}

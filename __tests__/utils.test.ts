import * as Utils from '../src/utils'

import { TailwindCSSOpacity } from '../src/types'

function test_buildClassName(): void {
  const targetAttr: TailwindCSSOpacity.AttributeTarget = { label: 'text', attr: 'color' }
  const opacityOption: TailwindCSSOpacity.Option = { label: '100', value: 0.1 }
  const colorKey: string = 'blue'
  test('Build valid className (buildClassName) - accept null from previousKeys', (): void => {
    const previousKeys: string[] | null = null
    expect(Utils.buildClassName(targetAttr, previousKeys, colorKey, opacityOption)).toStrictEqual(
      `.text-${(previousKeys || [])
        .map((prevKey: string): string => prevKey + '-')
        .join('')}blue-100`
    )
  })
  test('Build valid className (buildClassName) - accept array from previousKeys', (): void => {
    const previousKeys: string[] | null = ['1']
    expect(Utils.buildClassName(targetAttr, previousKeys, colorKey, opacityOption)).toStrictEqual(
      `.text-${previousKeys.map((prevKey: string): string => prevKey + '-').join('')}blue-100`
    )
  })
}

function test_constructClassStyle(): void {
  test('Build class style object (constructClassStyle)', (): void => {
    const className: string = '.text-blue-100'
    const targetAttr: TailwindCSSOpacity.AttributeTarget = { label: 'text', attr: 'color' }
    const opacityOption: TailwindCSSOpacity.Option = { label: '100', value: 0.1 }
    const hex: TailwindCSSOpacity.Hex = { r: 255, g: 255, b: 255 }
    expect(Utils.constructClassStyle(targetAttr, className, hex, opacityOption)).toStrictEqual({
      '.text-blue-100': {
        color: `rgba(255, 255, 255, 0.1)`,
      },
    })
  })
}

function test_buildOpacityOptions(): void {
  test('Build opacity options list (buildOpacityOptions) accept valid opacity array', (): void => {
    const opacities: TailwindCSSOpacity.Params['opacities'] = [0.1]
    expect(Utils.buildOpacityOptions(opacities)).toStrictEqual([{ label: '100', value: 0.1 }])
  })
  test('Build opacity options list (buildOpacityOptions) accept null opacity object', (): void => {
    const opacities: any = null
    expect(Utils.buildOpacityOptions(opacities)).toStrictEqual([
      { label: '100', value: 0.1 },
      { label: '250', value: 0.25 },
      { label: '500', value: 0.5 },
      { label: '800', value: 0.8 },
    ])
  })
}

function test_hexToRgb(): void {
  test('Build HEX to RGB (hexToRgb) accept valid HEX', (): void => {
    const hex: string = '#ffffff'
    expect(Utils.hexToRgb(hex)).toStrictEqual({
      r: 255,
      g: 255,
      b: 255,
    })
  })
  test('Build HEX to RGB (hexToRgb) accept invalid HEX', (): void => {
    const hex: string = '#fff'
    expect(Utils.hexToRgb(hex)).toStrictEqual(null)
  })
  test('Build HEX to RGB (hexToRgb) accept null opacity object', (): void => {
    const hex: string | null = null
    expect(Utils.hexToRgb(hex as any)).toStrictEqual(null)
  })
}

test_constructClassStyle()
test_buildClassName()
test_buildOpacityOptions()
test_hexToRgb()

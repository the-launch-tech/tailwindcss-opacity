import * as Utils from '../src/utils'

import { TailwindCSSOpacity } from '../src/types'

const targetAttr: TailwindCSSOpacity.AttributeTarget = { label: 'text', attr: 'color' }
const opacityOption: TailwindCSSOpacity.Option = { label: '100', value: 0.1 }
const colorKey: string = 'blue'

test('Build valid className (buildClassName) - accept null from previousKeys', () => {
  const previousKeys: string[] | null = null
  expect(Utils.buildClassName(targetAttr, previousKeys, colorKey, opacityOption)).toStrictEqual(
    `.text-${(previousKeys || []).map((prevKey: string): string => prevKey + '-').join('')}blue-100`
  )
})

test('Build valid className (buildClassName) - accept array from previousKeys', () => {
  const previousKeys: string[] | null = ['1']
  expect(Utils.buildClassName(targetAttr, previousKeys, colorKey, opacityOption)).toStrictEqual(
    `.text-${previousKeys.map((prevKey: string): string => prevKey + '-').join('')}blue-100`
  )
})

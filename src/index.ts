import * as Utils from './utils'
import * as Constants from './constants'

import { TailwindCSSOpacity } from './types'

export default function(
  params: TailwindCSSOpacity.Params | undefined = {}
): TailwindCSSOpacity.Tailwind.PluginReturnFunction {
  const { opacities, variants, excludedAttributes, includedAttributes, deepControl } = params
  return ({ theme, e, addUtilities }: TailwindCSSOpacity.Tailwind.PluginParams): void => {
    const themeOpacity = theme('opacity')
    const themeColors = theme('colors')

    function recursiveUtilityBuild(
      targetAttr: TailwindCSSOpacity.AttributeTarget,
      opacityOption: TailwindCSSOpacity.Option,
      colors: TailwindCSSOpacity.Tailwind.Colors | string,
      previousKeys: string[] | null = null,
      newOption: boolean = true
    ) {
      if (newOption) previousKeys = null
      return (Object.keys(colors) || []).map((colorKey: string, i: number) => {
        if (typeof colors[colorKey] === 'string') {
          const className: string = Utils.buildClassName(
            targetAttr,
            previousKeys,
            colorKey,
            opacityOption
          )
          const hex: TailwindCSSOpacity.Hex = Utils.hexToRgb(colors[colorKey])
          return Utils.constructClassStyle(targetAttr, className, hex, opacityOption)
        }
        return recursiveUtilityBuild(
          targetAttr,
          opacityOption,
          colors[colorKey],
          previousKeys ? [...previousKeys, colorKey] : [colorKey],
          false
        )
      })
    }

    let opacityOptions: TailwindCSSOpacity.Option[] = []

    if (!!opacities) {
      opacityOptions = Utils.buildOpacityOptions(opacities)
    } else {
      opacityOptions = Utils.buildOpacityOptions(themeOpacity, true)
    }

    const utilityArrayGroups = Constants.defaultAttributeTargets
      .filter(utilityGroup => (excludedAttributes || []).indexOf(utilityGroup.attr) < 0)
      .map(targetAttr =>
        opacityOptions.map(opacityOption =>
          recursiveUtilityBuild(targetAttr, opacityOption, themeColors)
        )
      )

    const utilityArray = Utils.flattenUtility(utilityArrayGroups).filter(Boolean)

    addUtilities(utilityArray, {
      variants: !!variants ? variants : ['hover', 'active', 'focus', 'disabled'],
    })
  }
}

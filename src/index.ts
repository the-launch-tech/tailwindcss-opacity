import * as Utils from './utils'
import * as Constants from './constants'

import { TailwindCSSOpacity } from './types'

export default function({
  opacities,
  variants,
  excludedAttributes,
  includedAttributes,
  deepControl,
}: TailwindCSSOpacity.Params): TailwindCSSOpacity.Tailwind.PluginReturnFunction {
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

    if (!deepControl || deepControl.inclusiveToTheme) {
      let opacityOptions: TailwindCSSOpacity.Option[] = []

      if (!opacities) {
        opacityOptions = Utils.buildOpacityOptions(themeOpacity, true)
      } else {
        opacityOptions = Utils.buildOpacityOptions(opacities)
      }

      const utilityArrayGroups = Constants.defaultAttributeTargets
        .filter(utilityGroup => (excludedAttributes || []).indexOf(utilityGroup.attr) < 0)
        .map(targetAttr =>
          opacityOptions.map(opacityOption =>
            recursiveUtilityBuild(targetAttr, opacityOption, themeColors)
          )
        )

      const utilityArray = Utils.flattenUtility(utilityArrayGroups).filter(Boolean)

      addUtilities(utilityArray, { variants })
    } else if (Utils.validDeepControl(deepControl)) {
      //
    } else {
      console.warn('TailwindCSSOpacity: Invalid deepControl object. Check your configuration.')
    }
  }
}

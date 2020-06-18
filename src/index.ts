import * as Utils from './utils'
import * as Constants from './constants'

import { TailwindCSSOpacity } from './types'

export default function({
  opacities,
  variants,
  control,
}: TailwindCSSOpacity.Params): TailwindCSSOpacity.Tailwind.PluginReturnFunction {
  return ({ theme, e, addUtilities }: TailwindCSSOpacity.Tailwind.PluginParams): void => {
    if (typeof theme !== 'function') {
      return
    }

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

    const opacityOptions: TailwindCSSOpacity.Option[] = Utils.buildOpacityOptions(opacities)

    const utilityArrayGroups = Constants.defaultAttributeTargets
      .filter(
        utilityGroup =>
          (control ? control.excludedAttributes || [] : []).indexOf(utilityGroup.attr) < 0
      )
      .map(targetAttr =>
        opacityOptions.map(opacityOption =>
          recursiveUtilityBuild(targetAttr, opacityOption, theme('colors'))
        )
      )

    const utilityArray = Utils.flattenUtility(utilityArrayGroups).filter(Boolean)

    addUtilities(utilityArray, { variants })
  }
}

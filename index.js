'use strict'
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j]
    return r
  }
Object.defineProperty(exports, '__esModule', { value: true })
var Utils = require('./utils')
var Constants = require('./constants')
function default_1(_a) {
  var opacities = _a.opacities,
    variants = _a.variants,
    control = _a.control
  return function(_a) {
    var theme = _a.theme,
      e = _a.e,
      addUtilities = _a.addUtilities
    if (typeof theme !== 'function') {
      return
    }
    function recursiveUtilityBuild(targetAttr, opacityOption, colors, previousKeys, newOption) {
      if (previousKeys === void 0) {
        previousKeys = null
      }
      if (newOption === void 0) {
        newOption = true
      }
      if (newOption) previousKeys = null
      return (Object.keys(colors) || []).map(function(colorKey, i) {
        if (typeof colors[colorKey] === 'string') {
          var className = Utils.buildClassName(targetAttr, previousKeys, colorKey, opacityOption)
          var hex = Utils.hexToRgb(colors[colorKey])
          return Utils.constructClassStyle(targetAttr, className, hex, opacityOption)
        }
        return recursiveUtilityBuild(
          targetAttr,
          opacityOption,
          colors[colorKey],
          previousKeys ? __spreadArrays(previousKeys, [colorKey]) : [colorKey],
          false
        )
      })
    }
    var opacityOptions = Utils.buildOpacityOptions(opacities)
    var utilityArrayGroups = Constants.defaultAttributeTargets
      .filter(function(utilityGroup) {
        return (control ? control.excludedAttributes || [] : []).indexOf(utilityGroup.attr) < 0
      })
      .map(function(targetAttr) {
        return opacityOptions.map(function(opacityOption) {
          return recursiveUtilityBuild(targetAttr, opacityOption, theme('colors'))
        })
      })
    var utilityArray = Utils.flattenUtility(utilityArrayGroups).filter(Boolean)
    addUtilities(utilityArray, { variants: variants })
  }
}
module.exports = default_1

module.exports = function({ opacities, variants }) {
  var defaultOpacities = [0.1, 0.25, 0.5, 0.8]
  var targetGroups = [
    { label: 'text', attr: 'color' },
    { label: 'border', attr: 'borderColor' },
    { label: 'bg', attr: 'backgroundColor' },
  ]

  function flattenUtility(array) {
    var flattenUtility = arr => {
      return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flattenUtility(b) : b), [])
    }
    return flattenUtility(array)
  }

  function buildOptions(opacities) {
    return (opacities || defaultOpacities).map(item => {
      return { label: `${parseFloat(item) * 1000}`, value: parseFloat(item) }
    })
  }

  function createUtility(target, option, color, className) {
    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null
    }

    var hex = hexToRgb(color)

    if (!hex) {
      return false
    }

    var classStyle = {}
    classStyle[className] = {}
    classStyle[className][target.attr] = `rgba(${hex.r}, ${hex.g}, ${hex.b}, ${option.value})`
    return classStyle
  }

  return ({ theme, e, addUtilities }) => {
    var colors = typeof theme == 'function' ? theme('colors') : themeColors
    var options = buildOptions(opacities)

    var loopColors = (target, option, cols, prevKeys = null, newOption = true) => {
      if (newOption) {
        prevKeys = null
      }

      return cols
        ? Object.keys(cols).map((key, i) => {
            if (typeof cols[key] === 'string') {
              let classNames = '.' + target.label + '-'
              if (prevKeys) {
                prevKeys.map(prevKey => {
                  classNames += prevKey + '-'
                })
              }
              classNames += key + '-'
              classNames += '' + option.label
              return createUtility(target, option, cols[key], classNames)
            }
            return loopColors(
              target,
              option,
              cols[key],
              prevKeys ? [...prevKeys, key] : [key],
              false
            )
          })
        : []
    }

    var classNames = flattenUtility(
      targetGroups.map(target => {
        return options.map(option => {
          return loopColors(target, option, colors)
        })
      })
    ).filter(Boolean)

    addUtilities(classNames, {
      variants,
    })
  }
}

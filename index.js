const { log, error } = console

export default function opacityUtility(opacities) {
  const defaultOpacities = [0.1, 0.25, 0.5, 0.8]
  const targetGroups = [
    { label: 'text', attr: 'color' },
    { label: 'border', attr: 'borderColor' },
    { label: 'bg', attr: 'backgroundColor' },
  ]

  function flattenUtility(array) {
    const flattenUtility = arr => {
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
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null
    }

    const hex = hexToRgb(color)

    if (!hex) {
      return false
    }

    const classStyle = {}
    classStyle[className] = {}
    classStyle[className][target.attr] = `rgba(${hex.r}, ${hex.g}, ${hex.b}, ${option.value})`
    return classStyle
  }

  return ({ theme, variants, e, addBase, addUtilities }) => {
    const colors = typeof theme == 'function' ? theme('colors') : themeColors
    const options = buildOptions(opacities)

    const loopColors = (target, option, cols, prevKeys = null, newOption = true) => {
      if (newOption) {
        prevKeys = null
      }

      return cols
        ? Object.keys(cols).map((key, i) => {
            if (typeof cols[key] === 'string') {
              const utility = createUtility(
                target,
                option,
                cols[key],
                [
                  `.${target.label}-`,
                  ...(prevKeys ? prevKeys.map(prevKey => `${prevKey}-`) : ['']),
                  `${key}-`,
                  `${option.label}`,
                ].join('')
              )
              return utility
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

    const classNames = flattenUtility(
      targetGroups.map(target => {
        return options.map(option => {
          return loopColors(target, option, colors)
        })
      })
    ).filter(Boolean)

    if (typeof addUtilities == 'function') {
      addUtilities(classNames, {
        variants,
      })
    } else {
      return classNames
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const results = opacityUtility([0.1, 0.3, 0.111])
  log(results({}))
}

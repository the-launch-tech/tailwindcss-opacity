# TailwindCSS Opacity Plugin

### Contribution to the TailwindCSS community and product.

Currently TailwindCSS only offers opacity at the element level, not the attribute level. This plugin provides granular or optional basic control over RGBA/"opacity" at the attribute level to complement your TailwindCSS `theme('colors')` and optionally your `theme('opacity')`configuration.

### Features

- Granular control through config so that your generated file doesn't explode with unused classes

  - Opacity Opt-In `pluginConfig.opacities: number[]`
  - Variant Opt-In `pluginConfig.variants: string[]`
  - Attribute Opt-Out `pluginConfig.excludedAttributes: string[]`

- Handles `theme('colors')` recursively

- RGBA available on all color defining CSS attributes

  1. Property: `color`, Prefix: `text`
  2. Property: `backgroundColor`, Prefix: `bg`
  3. Property: `borderColor`, Prefix: `border`
  4. Property: `borderColorTop`, Prefix: `border-t`
  5. Property: `borderColorRight`, Prefix: `border-r`
  6. Property: `borderColorBottom`, Prefix: `border-b`
  7. Property: `borderColorLeft`, Prefix: `border-l`
  8. Property: `stroke`, Prefix: `stroke`
  9. Property: `fill`, Prefix: `fill`

- Simple option to generate RGBA attributes based solely on `theme('colors')` and `theme('opacity')`

- _v3.0.0_ Super granular control at the individual color level, inclusive or exclusive to theme configuration for maximum specification

  - Build color map so that `variants`, `opacities`, `excludedAttributes` can be independent for each color in `theme('colors')`.

---

## 2.x.x User Facing Changes

1. (non-breaking) `excludedAttributes` property on config object is optional. View examples below to see potential usage.
2. (non-breaking) `deepControl` property on config object is optional. View examples below to see potential usage.

---

## Usage

### 1. Installation

- `npm i --save tailwindcss-opacity`

---

### 2. Explaination of Generated Classnames

- `.text-blue-100`

  - `text` = color attribute
  - `blue` = `theme('colors')`, `{ colors: { blue: '#XXXXXX' } }`
  - `100` = 0.1 opacity

- `.border-blue-1-450`

  - `border` = border-color attribute
  - `1-blue` = `theme('colors')`, `{ colors: { blue: { 1: '#XXXXXX' } } }`
  - `450` = 0.45 opacity

- `.bg-light-blue-200`

  - `bg` = background-color attribute
  - `light-blue` = `theme('colors')`, `{ colors: { light: { blue: '#XXXXXX' } } }`
  - `200` = 0.2 opacity

---

### 3. Example Generation

```css
.text-red-0-850 {
  color: rgba(250, 236, 236, 0.85);
}

.text-red-3-850 {
  color: rgba(204, 54, 46, 0.85);
}

.text-green-0-850 {
  color: rgba(242, 248, 243, 0.85);
}

.bg-red-4-400 {
  background-color: rgba(167, 45, 38, 0.4);
}

.bg-yellow-2-400 {
  background-color: rgba(249, 242, 187, 0.4);
}

.bg-yellow-3-400 {
  background-color: rgba(136, 132, 102, 0.4);
}

.bg-blue-4-650 {
  background-color: rgba(10, 22, 31, 0.65);
}
```

---

### 4. Example config in tailwind.config.js

##### a. Configuration Types

```typescript
config: {
  ...
  colors: {
    [colorKey: string | number]: string
  },
  opacity?: number[]                // Optional for simple generation
  ...
}

pluginConfig?: {                    // Alternative config for granular control
  opacities?: number[]
  variants?: string[]
  excludedAttributes?: string[]
  deepControl?: {                   // Available in v3.0.0
    inclusiveToTheme: boolean
    colorMap: {
      [colorHex]: {
        opacities?: number[]
        variants?: string[]
        excludedAttributes?: string[]
      }
    }
  }
}
```

---

##### b. Example Configuration

```javascript
/**
 * Config for more granular control
 */
{
  plugins: [
    require('tailwindcss-opacity')({
      opacities: [0.1, 0.2, 0.4, 0.65, 0.85], // Opacities applied to theme('colors')
      variants: ['hover', 'active', 'disabled'], // Variants to apply opacities to
      excludedAttributes: ['borderColor'], // Exclude borderColor from generation
    }),
  ]
}

/**
 * Only use theme('colors') and theme('opacity')
 */
{
  plugins: [require('tailwindcss-opacity')()]
}

/**
 * @unreleased for 3.0.0. Config for fully granular control (unreleased)
 */
{
  plugins: [
    require('tailwindcss-opacity')({
      deepControl: {
        inclusiveToTheme: false,
        colorMap: {
          blue: {
            opacities: [0.1, 0.2],
            variants: ['hover'],
          },
          'red-1': {
            opacities: [0.1, 0.3, 0.8],
            excludedAttributes: ['fill', 'stroke'],
          },
        },
      },
    }),
  ]
}
```

---

## History

- `1.0.0` Npm Module, Open Source, published
- `2.0.0` Integrate Typescript
- `2.0.0` Add excludable attributes
- `2.0.1` Example generated classNames added to readme
- `2.0.1` Beginning unit testing with Jest and Typescript
- `2.0.2` Completed unit tests for utils.ts
- `2.1.1` Added simple generation based on `theme('opacity')` as an option

---

## Credits

- Company: ©2019 The Launch
- Author: Daniel Griffiths
- Role: Founder and Engineer
- Project: ©2020 TailwindCSS Opacity (contribution to TailwindCSS community)

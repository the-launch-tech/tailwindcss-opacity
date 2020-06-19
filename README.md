# TailwindCSS Opacity Plugin

### Contribution to the TailwindCSS community and product.

- Open source npm module for TailwindCSS.

- Provides easy generation of opacity classNames through the tailwind.config.js setup for use on color, borderColor, and backgroundColor attributes complementing your TailwindCSS theme('colors') configuration.

- Currently tailwindcss only offers opacity at the element level, not the attribute level.

## Use

- `npm i --save tailwindcss-opacity`

- Example generated classNames:
  -- `.text-blue-100` (color attr, theme defined {blue: '#HEX'}, 0.1 opacity)
  -- `.border-blue-1-450` (border-color attr, theme defined {blue: {1: '#HEX'}}, 0.45 opacity)
  -- `.bg-light-blue-200` (background-color attr, theme defined {light: {blue: '#HEX'}}, 0.2 opacity)

- Example config:

```
In tailwind.config.js

{
  plugins: [
    require('tailwindcss-opacity')({
      opacities: [0.1, 0.2, 0.4, 0.65, 0.85], // Opacities applied to theme('colors')
      variants: ['hover', 'focus', 'active', 'visited', 'disabled'], // Variants to apply opacities to
      control: {
        excludedAttributes: ['borderColor'] // Exclude borderColor from generation
      }
    })
  ]
}
```

## History

- `1.0.0` Npm Module, Open Source, published
- `2.0.0` Integrate Typescript
- `2.0.0` Add excludable attributes
- `2.0.1` Example generated classNames added to readme
- `2.0.1` Beginning unit testing with Jest and Typescript
- `2.0.2` Completed unit tests for utils.ts

## Credits

- Company: ©2019 The Launch
- Author: Daniel Griffiths
- Role: Founder and Engineer
- Project: ©2020 TailwindCSS Opacity (contribution to TailwindCSS community)

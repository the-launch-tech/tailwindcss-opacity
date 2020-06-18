# TailwindCSS Opacity Plugin

### Contribution to the TailwindCSS community and product.

- Open source npm module for TailwindCSS.

- Provides easy generation of opacity classNames through the tailwind.config.js setup for use on color, borderColor, and backgroundColor attributes complementing your TailwindCSS theme('colors') configuration.

- Currently tailwindcss only offers opacity at the element level, not the attribute level.

## Use

- `npm i --save tailwindcss-opacity`

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

- Npm Module, Open Source
- `2.0.0` Integrate typescript
- `2.0.0` Add excludable attributes

## Credits

- Company: ©2019 The Launch
- Author: Daniel Griffiths
- Role: Founder and Engineer
- Project: ©2020 TailwindCSS Opacity (contribution to TailwindCSS community)

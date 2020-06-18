export namespace TailwindCSSOpacity {
  export type Hex = { r: number; g: number; b: number } | null

  export type ColorDefinition = {
    opacity: number
    attrs: string[]
    variants: string[]
  }

  export type ControlMap = {
    excludedAttributes?: string[]
  }

  export type Option = {
    label: string
    value: number
  }

  export type Params = {
    opacities: number[]
    variants: string[]
    control?: ControlMap
  }

  export type AttributeTarget = {
    label: string
    attr: string
  }

  export namespace Tailwind {
    export type Colors = {
      [key: string]: string | Colors
    }

    export type Config = {
      colors: Colors
    }

    export type PluginParams = {
      theme: (key: string) => any
      e: (string: string) => string
      addUtilities: (utility: any, config: any) => void
    }

    export type PluginReturnFunction = (config: TailwindCSSOpacity.Tailwind.PluginParams) => void
  }
}

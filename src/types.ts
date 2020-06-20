export namespace TailwindCSSOpacity {
  export type Hex = { r: number; g: number; b: number } | null

  export type ColorDefinition = {
    opacity: number
    attrs: string[]
    variants: string[]
  }

  export type ColorMap = {
    [colorKey: string]: ColorDefinition
  }

  export type ControlMap = {
    inclusiveToTheme?: boolean
    colorMap: ColorMap
  }

  export type Params = {
    opacities?: number[]
    variants?: string[]
    excludedAttributes?: string[]
    includedAttributes?: string[]
    deepControl?: ControlMap
  }

  export type Option = {
    label: string
    value: number
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

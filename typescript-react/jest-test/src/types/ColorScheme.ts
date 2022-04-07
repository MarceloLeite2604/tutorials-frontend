type ColorScheme = 'light' | 'dark';
export interface ColorSchemeSelector {
  browserDefined: boolean,
  selectedColorScheme: ColorScheme
}

export const theme = {
  borderRadius: {
    small: '2px',
    medium: '8px',
    large: '16px',
  },
  transition: '0.25s ease'
};

type ThemeType = typeof theme;
export type { ThemeType };

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ThemeType {}
}

export default theme;

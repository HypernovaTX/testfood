type ColorPalette = {
  black: string;
  white: string;
  gray: string;
  accent: string;
  loading: string;
  star: string;
  error: string;
  background: string;
  warning: string;
};

type ColorSets = {
  [k: string]: ColorPalette;
};

export const colors: ColorSets = {
  light: {
    black: "#000",
    white: "#FFF",
    gray: "#888",
    accent: "#4C3F96",
    loading: "#CCC",
    star: "#FC0",
    background: "#D8D8D8",
    error: "#B00",
    warning: "#F84",
  },
  dark: {
    black: "#FFF",
    white: "#000",
    gray: "#888",
    accent: "#8976F5",
    loading: "#222",
    star: "#FC0",
    background: "#181818",
    error: "#F44",
    warning: "#F84",
  },
};

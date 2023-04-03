import { ThemeProvider as EmotionThemeProvider, Theme } from "@emotion/react";

const fontFamily = '"Volvo Novum", Arial, sans-serif';

const theme: Theme = {
  typography: {
    h4: {
      textTransform: "uppercase",
      fontFamily,
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "1.5rem",
      letterSpacing: "0.02em",
    },
    h5: {
      textTransform: "uppercase",
      fontFamily,
      fontSize: "0.75rem",
      fontWeight: 700,
      lineHeight: "1.25rem",
      letterSpacing: "0.02em",
    },
    body2: {
      fontFamily,
      fontWeight: 300,
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
  },
  color: {
    text: {
      primary: "#000000eb",
      secondary: "#0000008f",
    },
  },
};

export const ThemeProvider = ({ children }: any) => (
  <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
);

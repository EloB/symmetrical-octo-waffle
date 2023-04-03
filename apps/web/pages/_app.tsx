import createCache from "@emotion/cache";
import { CacheProvider, Global, css } from "@emotion/react";
import { ThemeProvider, fonts } from "@volvo/ui";
import { AppProps } from "next/app";

const cache = createCache({ key: "next" });

const reset = css`
  body {
    margin: 0;
  }
`;

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    <Global styles={[fonts, reset]} />
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
);

export default App;

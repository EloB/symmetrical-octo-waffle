import { CSSProperties } from "react";
import "@emotion/react";

type Font = Required<
  Pick<CSSProperties, "fontFamily" | "fontSize" | "fontWeight" | "lineHeight">
> &
  Pick<CSSProperties, "fontStyle" | "textTransform" | "letterSpacing">;

declare module "@emotion/react" {
  export interface Theme {
    typography: Record<"h4" | "h5" | "body2", Font>;
    color: {
      text: {
        primary: CSSProperties["color"];
        secondary: CSSProperties["color"];
      };
    };
  }
}

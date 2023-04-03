import { Interpolation, Theme } from "@emotion/react";

export const createStyles = <T extends Record<string, Interpolation<Theme>>>(
  object: T
) => object;

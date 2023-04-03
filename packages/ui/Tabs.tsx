import { ComponentProps, ElementType } from "react";
import { css } from "@emotion/react";

type TabsProps<T extends ElementType> = {
  as?: T;
} & ComponentProps<T>;

const root = css`
  display: flex;
  list-style: none;
  padding: 0;
  gap: 1rem;
`;

export const Tabs = <T extends ElementType = "ul">({
  as,
  ...props
}: TabsProps<T>) => {
  const Component = as || "ul";

  return <Component css={root} {...props} />;
};

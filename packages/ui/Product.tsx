import { ElementType, ComponentProps } from "react";
import { createStyles } from "./createStyles";

type ProductProps<T extends ElementType> = {
  as?: T;
  clickable?: boolean;
} & Omit<ComponentProps<T>, "as">;

const styles = createStyles({
  root: {
    textDecoration: "none",
  },
});

export const Product = <T extends ElementType>({
  as,
  ...props
}: ProductProps<T>) => {
  const Component = as || "div";

  return <Component {...props} css={styles.root} />;
};

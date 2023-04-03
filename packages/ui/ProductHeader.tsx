import { ElementType, ComponentProps, ReactNode } from "react";
import { createStyles } from "./createStyles";

type ProductHeaderProps<T extends ElementType> = {
  as?: T;
  primary?: ReactNode;
  secondary: ReactNode;
  tertiary: ReactNode;
} & Omit<ComponentProps<T>, "as">;

const styles = createStyles({
  root: {
    display: "grid",
    gridTemplate: '"tertiary" "primary" "secondary"',
    "@media(min-width: 1024px)": {
      gridTemplate: `
        "tertiary tertiary" auto
        "primary secondary" auto / max-content
      `,
    },
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  primary: [
    (theme) => ({
      ...theme.typography.h4,
      color: theme.color.text.primary,
    }),
    {
      gridArea: "primary",
      marginRight: "0.25rem",
    },
  ],
  secondary: [
    (theme) => ({
      ...theme.typography.body2,
      color: theme.color.text.secondary,
    }),
    {
      gridArea: "secondary",
    },
  ],
  tertiary: [
    (theme) => ({
      ...theme.typography.h5,
      color: theme.color.text.secondary,
    }),
    {
      gridArea: "tertiary",
    },
  ],
});

export const ProductHeader = <T extends ElementType = "div">({
  as,
  primary,
  secondary,
  tertiary,
  ...props
}: ProductHeaderProps<T>) => {
  const Component = as || "div";

  return (
    <Component {...props} css={styles.root}>
      <div className="label" css={styles.primary}>
        {primary}
      </div>
      <div className="label" css={styles.secondary}>
        {secondary}
      </div>
      <div className="label" css={styles.tertiary}>
        {tertiary}
      </div>
    </Component>
  );
};

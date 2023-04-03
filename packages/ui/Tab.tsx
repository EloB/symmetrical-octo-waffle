import { motion } from "framer-motion";
import { ComponentProps, ElementType } from "react";
import { createStyles } from "./createStyles";

type TabProps<T extends ElementType> = {
  as?: T;
  selected?: boolean;
} & Omit<ComponentProps<T>, "as">;

const styles = createStyles({
  root: [
    (theme) => ({
      ...theme.typography.body2,
      color: theme.color.text.secondary,
      "&:hover": {
        color: theme.color.text.primary,
      },
    }),
    {
      textDecoration: "none",
      transition: "color 300ms",
      cursor: "pointer",
    },
  ],
  selected: (theme) => ({
    color: theme.color.text.primary,
  }),
  underline: {
    height: "2px",
    backgroundColor: "#2a609d",
  },
});

export const Tab = <T extends ElementType = "li">({
  as,
  children,
  selected,
  ...props
}: TabProps<T>) => {
  const Component = as || "li";

  return (
    <Component {...props} css={[styles.root, selected && styles.selected]}>
      {children}
      {selected && (
        <motion.div
          css={styles.underline}
          layoutId="underline"
          transition={{ type: "spring" }}
        />
      )}
    </Component>
  );
};

import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps, ElementType } from "react";

type CarouselProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentProps<T>, "as">;

const root = css({
  position: "relative",
  overflow: "hidden",
});

const view = css({
  display: "flex",
  gap: "1.25rem",
});

export const Carousel = <T extends ElementType = "div">({
  as,
  children,
  ...props
}: CarouselProps<T>) => {
  const Component = as || "div";

  return (
    <Component {...props} css={root}>
      <motion.div css={view} drag="x" dragSnapToOrigin>
        <AnimatePresence mode="popLayout">{children}</AnimatePresence>
      </motion.div>
    </Component>
  );
};

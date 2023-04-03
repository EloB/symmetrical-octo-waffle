import { css } from "@emotion/react";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef } from "react";

type CarouselProps = HTMLMotionProps<"div">;

const root = css({
  flex: "0 0 calc(25% - 0.75 * 1.25rem)",
});

export const CarouselItem = forwardRef<HTMLDivElement, CarouselProps>(
  function CarouselItem(props, ref) {
    return (
      <motion.div
        {...props}
        css={root}
        ref={ref}
        layout
        transition={{ type: "spring", duration: 1 }}
        initial="enter"
        animate="visible"
        exit="leave"
        variants={{
          enter: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              when: "beforeChildren",
            },
          },
          leave: { opacity: 0 },
        }}
      />
    );
  }
);

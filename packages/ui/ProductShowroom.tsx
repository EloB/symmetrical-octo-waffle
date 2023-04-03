import { HTMLMotionProps, Variants, motion } from "framer-motion";
import { forwardRef, useRef, useMemo } from "react";
import { createStyles } from "./createStyles";

type Parts = (typeof parts)[number];

const ANGLE = Math.PI / 180;

const ctxGlobal = (() => {
  if (!global.document) return null;
  const canvas = global.document.createElement("canvas");
  global.document?.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
  return canvas.getContext("2d", { willReadFrequently: true });
})();

const parts = ["body", "frontwheel", "backwheel", "outline", "shadow"] as const;

const styles = createStyles({
  root: {
    display: "flex",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  canvas: {
    width: "100%",
  },
});

const variants: Variants = {
  enter: {
    value: 0,
  } as any,
  visible: {
    value: 0.5,
  } as any,
  leave: {
    value: 1,
  } as any,
};

type ShowroomProps = {
  image: HTMLImageElement;
};
export const ProductShowroom = forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & ShowroomProps
>(function Showroom({ image, ...props }, ref) {
  const refCanvas = useRef<HTMLCanvasElement>(null);

  const render = useMemo(() => {
    if (!ctxGlobal) return () => {};

    let ctx: CanvasRenderingContext2D;

    const entries: [
      string,
      Record<
        "x" | "y" | "left" | "top" | "right" | "bottom" | "width" | "height",
        number
      >
    ][] = parts.map((name, index) => {
      if (index) ctxGlobal.clearRect(0, 0, 800, 600);
      const offsetX = 1;
      const offsetY = 1 * (index * 600);
      ctxGlobal.drawImage(image, 1, offsetY, 800, 600, 0, 0, 800, 600);
      const imageData = ctxGlobal.getImageData(0, 0, 800, 600);
      const pixels = new Uint32Array(imageData.data.buffer);
      let [left, top, right, bottom] = [800, 600, 0, 0];
      pixels.forEach((pixel, index) => {
        if (!pixel) return;
        const [x, y] = [(index % 800) + 1, ~~(index / 800) + 1];
        if (x < left) left = x;
        else if (x > right) right = x;
        if (y < top) top = y;
        else if (y > bottom) bottom = y;
      });
      left -= 1;
      top -= 1;
      return [
        name,
        {
          x: offsetX + left,
          y: offsetY + top,
          left,
          top,
          right,
          bottom,
          width: right - left,
          height: bottom - top,
        },
      ];
    });
    const spritesheet = Object.fromEntries(entries);

    const drawImage = (part: Parts, rotation?: number) => {
      const { x, y, left, top, width, height } = spritesheet[part];
      if (rotation) {
        ctx.save();
        const w = left + width / 2;
        const h = top + height / 2;
        ctx.translate(w, h);
        ctx.rotate(rotation);
        ctx.translate(-w, -h);
      }
      ctx.drawImage(image!, x, y, width, height, left, top, width, height);
      if (rotation) ctx.restore();
    };

    return (value: number) => {
      ctx ??= refCanvas.current!.getContext("2d")!;
      ctx.save();
      ctx.clearRect(0, 0, 800, 600);
      ctx.translate(800 - value * 1600, 0);
      drawImage("shadow");
      drawImage("outline");
      drawImage("body");
      drawImage("frontwheel", -1440 * value * ANGLE);
      drawImage("backwheel", -1440 * value * ANGLE);
      ctx.restore();
    };
  }, [image]);

  return (
    <motion.div {...props} css={styles.root} ref={ref}>
      <motion.canvas
        css={styles.canvas}
        ref={refCanvas}
        width={800}
        height={600}
        variants={variants}
        transition={{ type: "spring", bounce: 0.1 }}
        onUpdate={({ value }) => render(value as number)}
      />
    </motion.div>
  );
});

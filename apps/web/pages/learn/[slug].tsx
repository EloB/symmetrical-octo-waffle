import { ProductShowroom, createStyles } from "@volvo/ui";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useEffect, useState } from "react";
import { Car } from "../../types";
import createAsyncImage from "../../utils/createAsyncImage";
import Link from "next/link";

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<
  { slug: string; src: string },
  { slug: string }
> = async (ctx) => {
  const slug = ctx.params?.slug;
  if (!slug) return { notFound: true };
  // TODO Replace baseurl with env NEXT_PUBLIC_BASEURL
  const url = new URL("/api/products", "http://localhost:3000");
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch products");
  const data = (await response.json()) as Car[];
  const item = data.find(({ id }) => id === slug);
  if (!item) return { notFound: true };

  return {
    props: {
      slug,
      src: item.imageUrl,
    },
  };
};

const styles = createStyles({
  root: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
});

const PageLearn = ({
  slug,
  src,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [image, setImage] = useState(() => {
    if (!global.Image) return;
    const image = new global.Image();
    image.src = src;
    if (image.complete) return image;
    return;
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const image = await createAsyncImage(src);
      if (!controller.signal.aborted) setImage(image);
    })();
    return () => controller.abort();
  }, [src]);

  return (
    <div css={styles.root}>
      <Link href="/">Till startsidan</Link>
      {image ? (
        <ProductShowroom
          image={image}
          layoutId={slug}
          initial="enter"
          animate="visible"
          exit="leave"
        />
      ) : null}
    </div>
  );
};

export default PageLearn;

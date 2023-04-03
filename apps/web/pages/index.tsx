import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useState, useEffect, useMemo } from "react";
import {
  Carousel,
  CarouselItem,
  Product,
  ProductHeader,
  ProductShowroom,
  Tab,
  Tabs,
  createStyles,
} from "@volvo/ui";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Car } from "../types";
import createAsyncImage from "../utils/createAsyncImage";

const styles = createStyles({
  container: {
    maxWidth: "1200px",
    width: "calc(100% - 3rem)",
    marginLeft: "auto",
    marginRight: "auto",
    boxSizing: "border-box",
  },
  root: {
    position: "relative",
    display: "flex",
    gap: "1.25rem",
  },
  item: {
    backgroundImage: "url(/images/background.png)",
    backgroundSize: "100%",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
    marginBottom: "2rem",
  },
});

export const getStaticProps: GetStaticProps<{ products: Car[] }> = async () => {
  const url = new URL("/api/products", "http://localhost:3000");
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch products");
  const data = (await response.json()) as Car[];
  return {
    props: {
      products: data,
    },
  };
};

const types: Record<string, { label: string; value: string }> = {
  all: {
    label: "Alla",
    value: "",
  },
  suv: {
    label: "Suv",
    value: "suv",
  },
  estate: {
    label: "Kombi",
    value: "estate",
  },
  sedan: {
    label: "Sedan",
    value: "sedan",
  },
};

export default function PageIndex({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const bodyType = ([] as string[]).concat(router.query.bodyType ?? "")[0];

  const [images, setImages] = useState<
    ((typeof products)[number] & { image: HTMLImageElement })[]
  >(() => {
    if (!global.Image) return [];

    const values = products
      .filter((item) => item.bodyType === bodyType || bodyType === "")
      .map((data) => ({
        ...data,
        image: createAsyncImage(data.imageUrl),
      }));

    return values.some(({ image }) => image instanceof Promise)
      ? []
      : (values as any);
  });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const values = await Promise.all(
          products
            .filter((item) => item.bodyType === bodyType || bodyType === "")
            .map(async (data) => ({
              ...data,
              image: await createAsyncImage(data.imageUrl),
            }))
        );
        if (controller.signal.aborted) return;
        setImages(values);
      } catch (e) {
        if (controller.signal.aborted) return;
        setImages([]);
      }
    })();
  }, [products, bodyType]);

  const tabCount = useMemo(
    () =>
      products.reduce(
        (obj, { bodyType }) => {
          obj[bodyType] ??= 0;
          obj[bodyType] += 1;
          return obj;
        },
        { all: products.length } as Record<string, number>
      ),
    [products]
  );

  return (
    <>
      <Head>
        <title>Startsidan</title>
      </Head>
      <div css={[styles.container, styles.tabs]}>
        <Tabs>
          {Object.entries(types).map(([key, { label, value }]) => (
            <Tab
              key={key}
              as={Link}
              selected={bodyType === value}
              href={{
                pathname: "/",
                ...(value && { query: { bodyType: value } }),
              }}
              replace
              shallow
            >
              {label} ({tabCount[key]})
            </Tab>
          ))}
        </Tabs>
      </div>
      <div css={[styles.container, styles.root]}>
        <Carousel>
          {Array.from(
            images,
            ({ id, modelName, modelType, bodyType, image }, index) => (
              <CarouselItem key={id}>
                <Product as={Link} href={`/learn/${id}`}>
                  <ProductHeader
                    primary={modelName}
                    secondary={modelType}
                    tertiary={types[bodyType].label}
                  />
                  <ProductShowroom
                    layoutId={id}
                    css={styles.item}
                    image={image}
                    variants={{
                      visible: { transition: { delayChildren: index * 0.3 } },
                    }}
                  />
                </Product>
              </CarouselItem>
            )
          )}
        </Carousel>
      </div>
    </>
  );
}

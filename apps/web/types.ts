import type {
  ComponentProps,
  ElementType,
  ReactElement,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
} from "react";

export type Car = {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
};

export type PolymorphicProps<
  T extends ElementType,
  P extends object,
  K extends string
> = {
  [As in K]?: T;
} & Omit<ComponentPropsWithoutRef<T>, K | keyof P> &
  Omit<P, K>;

export interface PolymorphicComponent<
  DefaultElementType extends ElementType,
  Props extends object = {},
  As extends string = "as"
> {
  <ActualElementType extends ElementType = DefaultElementType>(
    props: PolymorphicProps<ActualElementType, Props, As>,
    ref?: ComponentPropsWithRef<ActualElementType>["ref"]
  ): ReactElement | null;
}

export type PFC<
  DefaultElementType extends ElementType,
  Props extends object = {},
  As extends string = "as"
> = PolymorphicComponent<DefaultElementType, Props, As>;

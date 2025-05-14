import {
  ZodArray,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodType,
  ZodUnknown,
} from './zod-types.js';

export type Infer<Type extends ZodType> = Type extends ZodUnknown
  ? unknown
  : Type extends ZodString
    ? string
    : Type extends ZodNumber
      ? number
      : Type extends ZodArray<infer ElementType>
        ? InferElementType<ElementType>[]
        : Type extends ZodObject<infer ObjectType>
          ? InferObject<ObjectType>
          : never;

export type InferElementType<ElementType> = ElementType extends ZodType
  ? Infer<ElementType>
  : never;

export type InferObject<ObjectType extends Record<string, ZodType>> = {
  [Key in keyof ObjectType]: Infer<ObjectType[Key]>;
};

export type InferZodObject<Type extends ZodObject<Record<string, ZodType>>> =
  InferObject<Type['fields']>;

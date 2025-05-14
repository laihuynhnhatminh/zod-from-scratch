import { Infer, InferElementType, InferZodObject } from './infer.js';

export type ZodAttributeType = ZodOptional<ZodType> | ZodNullable<ZodType> | ZodStringUrl<ZodString>;

export type ZodType =
  | ZodUnknown
  | ZodString
  | ZodNumber
  | ZodAttributeType
  | ZodArray<ZodType>
  | ZodObject<Record<string, ZodType>>;

type OptionalOrNullable = 'optional' | 'nullable';

export interface ZodOptional<Type extends ZodType> {
  type: Type['type'];
  isOptional: true;
  parse(value: unknown): Infer<Type> | undefined;
}

export interface ZodNullable<Type extends ZodType> {
  type: Type['type'];
  isNullable: true;
  parse(value: unknown): Infer<Type> | null;
}

export interface ZodStringUrl<Type extends ZodString> {
  type: 'string';
  isUrl: true;
  parse(value: unknown): Infer<Type>;
}

export interface ZodUnknown {
  type: 'unknown';
  parse(value: unknown): unknown;
}

export interface ZodString {
  type: 'string';
  parse(value: unknown): string;
  url: () => Omit<ZodStringUrl<ZodString>, OptionalOrNullable>;
  optional(): Omit<ZodOptional<ZodString>, OptionalOrNullable>;
  nullable(): Omit<ZodNullable<ZodString>, OptionalOrNullable>;
}

export interface ZodNumber {
  type: 'number';
  parse(val: unknown): number;
  optional(): Omit<ZodOptional<ZodNumber>, OptionalOrNullable>;
  nullable(): Omit<ZodNullable<ZodNumber>, OptionalOrNullable>;
}

export interface ZodArray<Type extends ZodType> {
  type: 'array';
  element: Type;
  parse(val: unknown): InferElementType<Type>[];
  optional(): Omit<ZodOptional<ZodArray<Type>>, OptionalOrNullable>;
  nullable(): Omit<ZodNullable<ZodArray<Type>>, OptionalOrNullable>;
}

export interface ZodObject<Type extends Record<string, ZodType>> {
  type: 'object';
  fields: Type;
  parse(val: unknown): InferZodObject<ZodObject<Type>>;
  optional(): Omit<ZodOptional<ZodObject<Type>>, OptionalOrNullable>;
  nullable(): Omit<ZodNullable<ZodObject<Type>>, OptionalOrNullable>;
}

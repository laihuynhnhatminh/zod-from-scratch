import { Infer } from "./infer.js";

export type ZodType = ZodUnkown | ZodString;

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

export interface ZodUnkown {
  type: 'unknown';
  parse(value: unknown): unknown;
}

export interface ZodString {
  type: 'string';
  parse(value: unknown): string;
  optional(): Omit<ZodOptional<ZodString>, OptionalOrNullable>;
  nullable(): Omit<ZodNullable<ZodString>, OptionalOrNullable>;
}

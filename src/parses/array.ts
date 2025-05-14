import { InferElementType } from '../types/infer.js';
import { ZodType } from '../types/zod-types.js';

export function parseArray<Type extends ZodType>(
  element: Type,
  value: unknown,
): InferElementType<Type>[] {
  if (!Array.isArray(value)) {
    throw new Error('Invalid value: expected an array');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  value.forEach((v) => element.parse(v));

  return value;
}

export function parseOptionalArray<Type extends ZodType>(
  element: Type,
  value: unknown,
): InferElementType<Type>[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  return parseArray(element, value);
}

export function parseNullableArray<Type extends ZodType>(
  element: Type,
  value: unknown,
): InferElementType<Type>[] | null {
  if (value === null) {
    return null;
  }

  return parseArray(element, value);
}

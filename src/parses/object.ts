import { InferZodObject } from '../types/infer.js';
import { ZodObject, ZodType } from '../types/zod-types.js';

export function parseObject<Type extends Record<string, ZodType>>(
  fields: Type,
  value: unknown,
): InferZodObject<ZodObject<Type>> {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Invalid value: expected an object');
  }

  const objectValue = value as Record<string, unknown>;

  Object.entries(fields).forEach(([key, val]) => {
    const isKeyInObject = key in objectValue;

    // If the key is not in the object, we need to check if the value is optional or nullable
    // If the key is not in the object and the value is not optional or nullable, throw an error
    if (!isKeyInObject) {
      if (
        fields[key] &&
        ('isOptional' in fields[key] || 'isNullable' in fields[key])
      ) {
        return;
      }

      throw new Error(`Invalid value: missing key ${key}`);
    }

    if (!isKeyInObject) {
      throw new Error(`Invalid value: missing key ${key}`);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    val.parse(objectValue[key]);
  });

  return value as InferZodObject<ZodObject<Type>>;
}

export function parseOptionalObject<Type extends Record<string, ZodType>>(
  fields: Type,
  value: unknown,
): InferZodObject<ZodObject<Type>> | undefined {
  if (value === undefined) {
    return undefined;
  }

  return parseObject(fields, value);
}

export function parseNullableObject<Type extends Record<string, ZodType>>(
  fields: Type,
  value: unknown,
): InferZodObject<ZodObject<Type>> | null {
  if (value === null) {
    return null;
  }

  return parseObject(fields, value);
}

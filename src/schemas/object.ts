import {
  parseNullableObject,
  parseObject,
  parseOptionalObject,
} from '../parses/object.js';
import { ZodObject, ZodType } from '../types/zod-types.js';

const object = <Type extends Record<string, ZodType>>(
  fields: Type,
): ZodObject<Type> => ({
  type: 'object',
  fields,
  parse: (value: unknown) => parseObject(fields, value),
  optional: () => ({
    type: 'object',
    fields,
    isOptional: true,
    parse: (value: unknown) => parseOptionalObject(fields, value),
  }),
  nullable: () => ({
    type: 'object',
    fields,
    isNullable: true,
    parse: (value: unknown) => parseNullableObject(fields, value),
  }),
});

export default object;

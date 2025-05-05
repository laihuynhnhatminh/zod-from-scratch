import {
  parseNullableString,
  parseOptionalString,
  parseString,
} from '../parses/string.js';
import { ZodString } from '../types/zod-types.js';

const string = (): ZodString => ({
  type: 'string',
  parse: parseString,
  optional: () => ({
    type: 'string',
    isOptional: true,
    parse: parseOptionalString,
  }),
  nullable: () => ({
    type: 'string',
    isNullable: true,
    parse: parseNullableString,
  }),
});

export default string;

import {
  parseNullableString,
  parseOptionalString,
  parseString,
  parseUrlString,
} from '../parses/string.js';
import { ZodString } from '../types/zod-types.js';

const string = (): ZodString => ({
  type: 'string',
  parse: parseString,
  url: () => ({
    type: 'string',
    isUrl: true,
    parse: parseUrlString,
  }),
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

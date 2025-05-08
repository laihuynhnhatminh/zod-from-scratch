import {
  parseNullableNumber,
  parseNumber,
  parseOptionalNumber,
} from '../parses/number.js';
import { ZodNumber } from '../types/zod-types.js';

const number = (): ZodNumber => ({
  type: 'number',
  parse: parseNumber,
  optional: () => ({
    type: 'number',
    isOptional: true,
    parse: parseOptionalNumber,
  }),
  nullable: () => ({
    type: 'number',
    isNullable: true,
    parse: parseNullableNumber,
  }),
});

export default number;

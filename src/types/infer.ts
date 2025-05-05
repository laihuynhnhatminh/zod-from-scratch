import { ZodString, ZodType, ZodUnkown } from './zod-types.js';

export type Infer<Type extends ZodType> = Type extends ZodUnkown
  ? unknown
  : Type extends ZodString
    ? string
    : never;

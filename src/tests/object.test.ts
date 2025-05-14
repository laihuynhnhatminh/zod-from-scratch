/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it } from 'vitest';
import z from '../schemas/index.js';

describe('Object Schema', () => {
  it('should validate an object with string properties', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const validData = { name: 'John Doe', age: 30 };
    expect(schema.parse(validData)).toEqual(validData);
  });

  it('should throw an error for invalid object', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const invalidData = { name: 'John Doe', age: 'thirty' };
    expect(() => schema.parse(invalidData)).toThrow(
      'Invalid value: expected a number',
    );
  });

  it('should handle optional properties', () => {
    // @ts-ignore
    const schema = z.object({
      name: z.string(),
      age: z.number().optional(),
    });

    const undefineData = { name: 'John Doe', age: undefined };
    const normalData = { name: 'John Doe' };
    expect(schema.parse(normalData)).toEqual(normalData);
    expect(schema.parse(undefineData)).toEqual(undefineData);
  });

  it('should handle nullable properties', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number().nullable(),
    });

    const validData = { name: 'John Doe', age: null };
    expect(schema.parse(validData)).toEqual(validData);
  });

  it('should work with nested objects', () => {
    const schema = z.object({
      user: z.object({
        name: z.string(),
        age: z.number(),
      }),
    });
    const validData = { user: { name: 'John Doe', age: 30 } };
    expect(schema.parse(validData)).toEqual(validData);
  });

  it('should handle optional nested objects', () => {
    const schema = z.object({
      user: z
        .object({
          name: z.string(),
          age: z.number(),
        })
        .optional(),
    });

    const validData = { user: { name: 'John Doe', age: 30 } };
    const undefinedData = { user: undefined };
    expect(schema.parse(validData)).toEqual(validData);
    expect(schema.parse(undefinedData)).toEqual(undefinedData);
  });

  it('should handle array of objects', () => {
    const schema = z.object({
      users: z.array(
        z.object({
          name: z.string(),
          age: z.number(),
        }),
      ),
    });

    const validData = {
      users: [
        { name: 'John Doe', age: 30 },
        { name: 'Jane Doe', age: 25 },
      ],
    };
    expect(schema.parse(validData)).toEqual(validData);
  });
});

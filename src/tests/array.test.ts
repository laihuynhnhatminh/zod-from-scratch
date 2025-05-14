/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it } from 'vitest';
import z from '../schemas/index.js';

describe('Array Schema', () => {
  it('should validate an array of strings', () => {
    // Should not care about reference equality
    const exampleArray = ['test-string', 'another-string'];
    const resultArray = ['test-string', 'another-string'];
    expect(z.array(z.string()).parse(exampleArray)).toEqual(exampleArray);
    expect(z.array(z.string()).parse(exampleArray)).toEqual(resultArray);
  });

  it('should validate an array of numbers', () => {
    const exampleArray = [1, 2, 3];
    const resultArray = [1, 2, 3];
    expect(z.array(z.number()).parse(exampleArray)).toEqual(exampleArray);
    expect(z.array(z.number()).parse(exampleArray)).toEqual(resultArray);
  });

  it('should throw an error for a non-array', () => {
    expect(() => z.array(z.string()).parse('test-string')).toThrow(
      'Invalid value: expected an array',
    );
  });

  it('should throw an error for an array with invalid elements', () => {
    expect(() => z.array(z.string()).parse(['test-string', 123])).toThrow(
      'Invalid value: expected a string',
    );
  });

  it('should handle array of objects', () => {
    const schema = z.object({
      // @ts-ignore
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

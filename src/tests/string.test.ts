import { it, describe, expect } from 'vitest';
import z from '../schemas/index.js';

describe('String Schema', () => {
  it('should validate a string', () => {
    expect(z.string().parse('test-string')).toBe('test-string');
  });

  it('should throw an error for a non-string', () => {
    expect(() => z.string().parse(123)).toThrow('Invalid value: expected a string');
  });

  it('should handle optional strings', () => {
    expect(z.string().optional().parse(undefined)).toBeUndefined();
    expect(z.string().optional().parse('test-string')).toBe('test-string');

    expect(() => z.string().optional().parse(null)).toThrow(
      'Invalid value: expected a string',
    );
  });

  it('should handle nullable strings', () => {
    expect(z.string().nullable().parse(null)).toBeNull();
    expect(() => z.string().nullable().parse(undefined)).toThrow(
      'Invalid value: expected a string',
    );
    expect(z.string().nullable().parse('test-string')).toBe('test-string');
  });

  it('should handle URL strings', () => {
    expect(z.string().url().parse('https://example.com')).toBe('https://example.com');
    expect(() => z.string().url().parse('invalid-url')).toThrow(
      'Invalid value: expected a valid URL',
    );
  });
});

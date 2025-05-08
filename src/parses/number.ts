export function parseNumber(value: unknown): number {
  if (typeof value !== 'number') {
    throw new Error('Invalid value: expected a number');
  }

  return value;
}

export function parseOptionalNumber(value: unknown): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  return parseNumber(value);
}

export function parseNullableNumber(value: unknown): number | null {
  if (value === null) {
    return null;
  }

  return parseNumber(value);
}

export function parseString(value: unknown): string {
  if (typeof value !== 'string') {
    throw new Error('Invalid value: expected a string');
  }

  return value;
}

export function parseOptionalString(value: unknown): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return parseString(value);
}

export function parseNullableString(value: unknown): string | null {
  if (value === null) {
    return null;
  }

  return parseString(value);
}

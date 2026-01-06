import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateTotal, isValidEmail } from '../src/lib/utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });

  it('handles decimals', () => {
    expect(formatCurrency(99.99)).toBe('$99.99');
  });

  it('returns empty string for null/undefined', () => {
    expect(formatCurrency(null as unknown as number)).toBe('');
  });
});

describe('calculateTotal', () => {
  it('calculates total correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(calculateTotal(items)).toBe(35);
  });

  it('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});

describe('isValidEmail', () => {
  it('validates correct email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

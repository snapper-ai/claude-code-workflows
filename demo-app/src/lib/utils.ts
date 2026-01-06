// Example utilities - intentionally verbose for demo purposes

export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  if (amount === null || amount === undefined) {
    return '';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });

  const result = formatter.format(amount);
  return result;
}

export function calculateTotal(
  items: { price: number; quantity: number }[]
): number {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemTotal = item.price * item.quantity;
    total = total + itemTotal;
  }

  return total;
}

export function isValidEmail(email: string): boolean {
  if (!email) {
    return false;
  }

  if (email.length === 0) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return isValid;
}

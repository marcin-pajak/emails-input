/**
 * Validate email
 * @param value
 */
export const isValidEmail = (value: string): boolean =>
  /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,20}$/i.test(value);

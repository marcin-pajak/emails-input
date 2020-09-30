/**
 * Sanitizes rendered HTML
 * @param value
 */
export const sanitize = (value: string): string => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
};

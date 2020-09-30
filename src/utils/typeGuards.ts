/**
 * Verify if clicked element is a button
 * @param node
 */
export const isClickedButton = (
  node: EventTarget | null,
): node is HTMLButtonElement => {
  return Boolean((node as HTMLButtonElement).type === 'button');
};

/**
 * Verify if value is an array of emails
 * @param value
 */
export const isMultiple = (value: string | string[]): value is string[] => {
  return Array.isArray(value);
};

export const remove = (node?: Element | null): void => {
  if (node === undefined || node === null) {
    return;
  }

  if ('remove' in Element.prototype) {
    node.remove();
  } else if (node.parentNode !== null) {
    // eslint-disable-next-line unicorn/prefer-node-remove
    node.parentNode.removeChild(node);
  }
};

export const includes = (array: string[], item: string): boolean => {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/prefer-includes, unicorn/prefer-includes,
  return array.indexOf(item) !== -1;
};

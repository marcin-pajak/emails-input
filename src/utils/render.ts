/**
 * Render Component
 * @param template
 * @param element
 */
export const render = (template: string, element: Element): void => {
  element.innerHTML += template.trim();
};

/**
 * Make DOM Node from template
 * @param template
 */
export const makeElementFromHTML = (template: string): ChildNode => {
  const div = document.createElement('div');
  render(template, div);

  return div.firstChild as ChildNode;
};

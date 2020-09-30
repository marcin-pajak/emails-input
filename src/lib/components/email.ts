import { sanitize } from '../../utils/sanitize';
import { isClickedButton } from '../../utils/typeGuards';
import { EmailActions } from '../actions/types';
import { CLASSES } from '../constants';
import { Entry } from '../state/types';
import { EmailHandlers } from './types';

export const EMAIL_CLASSES = {
  removeButton: 'Email-remove',
  root: 'Email',
  text: 'Email-text',
};

const { removeButton, root, text } = EMAIL_CLASSES;

/**
 * Email Component Template
 * @param value
 * @param id
 */
export const emailTemplate = (value: Entry, id: string): string => `
<div class="${CLASSES.EMAIL} ${root} Email--${
  value.isValid ? 'valid' : 'invalid'
}" data-id="${id}">
  <span class="${text}">
    ${sanitize(value.email)}
  </span>
  <button aria-label="remove email" class="${removeButton}" data-id="${id}" type="button">
    &times;
  </button>
</div>`;

/**
 * Email Component Event Handlers
 * @param handlers
 */
export const makeEmailHandlers = (handlers: EmailActions): EmailHandlers => {
  const { removeByLocalId } = handlers;

  const handleRemoveClick = (event: MouseEvent): void => {
    const { target } = event;

    if (!isClickedButton(target)) {
      return;
    }

    const { id } = target.dataset;

    if (typeof id !== 'undefined') {
      removeByLocalId(id);
    }

    target.blur();
  };

  return {
    handleRemoveClick,
  };
};

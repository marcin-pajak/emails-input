import { ErrorCodes, ErrorWithCode } from '../../utils/error';
import { EmailActions } from '../actions/types';
import { CLASSES } from '../constants';
import { WindowWithClipboard } from '../types';
import { Elements, InputHandlers } from './types';

export const MIN_LENGTH = 21;

/**
 * Input Component Template
 */
export const inputTemplate = (): string =>
  `<input
    aria-label="add more people"
    class="${CLASSES.INPUT}"
    max-length="255"
    placeholder="add more people..."
  />`;

/**
 * Input Component Event Handlers
 * @param elements
 * @param handlers
 */
export const makeInputHandlers = (
  elements: Elements,
  handlers: EmailActions,
): InputHandlers => {
  const { add } = handlers;

  /**
   * Return input element
   */
  const getInput = (): HTMLInputElement => {
    const { input } = elements;

    if (input === null) {
      throw new ErrorWithCode(
        'Library is in wrong state.',
        ErrorCodes.ERR_INTERNAL,
      );
    }

    return input;
  };

  /**
   * Add email on enter and comma
   * @param event
   */
  const handleInputChange = (event: KeyboardEvent): void => {
    const input = getInput();
    const { key } = event;
    const trimmed = input.value.trim();

    if (trimmed === '') return;

    const inputWidth = Math.max(input.value.length + 1, MIN_LENGTH);
    input.style.minWidth = `${String(inputWidth)}ch`;

    if (key === 'Enter') {
      add(input.value);
      input.value = '';
    } else if (key === ',' && input.value.length > 1) {
      add(input.value.slice(0, Math.max(0, input.value.length - 1)));
      input.value = '';
    }
  };

  /**
   * Add email on paste
   * @param event
   */
  const handleInputPaste = (event: ClipboardEvent): boolean => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const input = getInput();
    const pastedText = (
      event.clipboardData ??
      ((window as unknown) as WindowWithClipboard).clipboardData
    )
      ?.getData('text')
      .trim();

    if (pastedText !== '' && pastedText !== undefined) {
      add(pastedText);
      input.value = '';
    }

    return false;
  };

  /**
   * Add email on blur
   */
  const handleInputBlur = (): void => {
    const input = getInput();
    const trimmedValue = input.value.trim();

    if (trimmedValue !== '') {
      add(trimmedValue);
      input.value = '';
    }
  };

  return {
    handleInputBlur,
    handleInputChange,
    handleInputPaste,
  };
};

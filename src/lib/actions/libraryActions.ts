import { ErrorCodes, ErrorWithCode } from '../../utils/error';
import { render } from '../../utils/render';
import { rootTemplate } from '../components/root';
import { CLASSES } from '../constants';
import { updateStateAction } from '../state/actionCreators';
import { LibraryState } from '../state/constants';
import { LibraryActionProperties, LibraryActions } from './types';

/**
 * Public init / destroy actions
 * @param LibraryActionProperties
 */
export const makeLibraryActions = ({
  elements,
  handlers,
  handleAction,
  state,
}: LibraryActionProperties): LibraryActions => {
  // Keep the input always visible
  const mutationHandler = (): void => {
    if (elements.wrapper !== null) {
      elements.wrapper.scrollTop = elements.wrapper.scrollHeight;
    }
  };

  const observer = new MutationObserver(mutationHandler);

  /**
   * Initialize Library
   * @public
   */
  const init = (): void => {
    // Validate state
    if (state.state === LibraryState.Initialized) {
      throw new ErrorWithCode(
        'Library already initialized.',
        ErrorCodes.ERR_INVALID_ACTION,
      );
    }

    // Render UI
    render(rootTemplate(state), elements.container);
    elements.container.classList.add(CLASSES.CONTAINER);

    // Set elements
    elements.input = elements.container.querySelector(`.${CLASSES.INPUT}`);
    elements.wrapper = elements.container.querySelector(`.${CLASSES.WRAPPER}`);

    // Validate
    if (elements.input === null || elements.wrapper === null) {
      throw new ErrorWithCode(
        'Library could not be initialized properly.',
        ErrorCodes.ERR_COULD_NOT_INITIALIZE,
      );
    }

    // Attach listeners
    elements.container.addEventListener('click', handlers.handleRemoveClick);
    elements.input.addEventListener('keyup', handlers.handleInputChange);
    elements.input.addEventListener('paste', handlers.handleInputPaste);
    elements.input.addEventListener('blur', handlers.handleInputBlur);
    observer.observe(elements.wrapper, {
      childList: true,
    });

    // Update state
    handleAction(updateStateAction(LibraryState.Initialized));
  };

  /**
   * Kill Library
   * @public
   */
  const destroy = (): void => {
    // Validate state
    if (state.state !== LibraryState.Initialized) {
      throw new ErrorWithCode(
        'Library is not initialized.',
        ErrorCodes.ERR_INVALID_ACTION,
      );
    }

    if (elements.input === null) {
      throw new ErrorWithCode(
        'Library is in wrong state.',
        ErrorCodes.ERR_INTERNAL,
      );
    }

    // Clean up
    elements.container.removeEventListener('click', handlers.handleRemoveClick);
    elements.input.removeEventListener('keyup', handlers.handleInputChange);
    elements.input.removeEventListener('paste', handlers.handleInputPaste);
    elements.input.removeEventListener('blur', handlers.handleInputBlur);
    observer.disconnect();

    // Clean UI
    elements.container.textContent = '';
    elements.container.classList.remove(CLASSES.CONTAINER);

    // Clean elements
    elements.wrapper = null;
    elements.input = null;

    // Update state
    handleAction(updateStateAction(LibraryState.Destroyed));
  };

  return {
    destroy,
    init,
  };
};

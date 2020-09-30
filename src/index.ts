import './styles.scss';

import { makeItemActions } from './lib/actions/emailActions';
import { makeLibraryActions } from './lib/actions/libraryActions';
import { makeEmailHandlers } from './lib/components/email';
import { makeInputHandlers } from './lib/components/input';
import { Elements, Handlers } from './lib/components/types';
import { makeOptions, validateOptions } from './lib/options';
import { Options } from './lib/options/types';
import { stateManager } from './lib/state/stateManager';
import { StateAction } from './lib/state/types';
import { Library } from './lib/types';

/**
 * Emails Input Library
 * @param element
 * @param userOptions
 */
const EmailsInput = (
  element: HTMLElement,
  userOptions?: Partial<Options>,
): Library => {
  // Merge and validate options
  const options: Options = makeOptions(userOptions);
  validateOptions(options);

  // Init State
  const { makeState, handleAction } = stateManager();
  const state = makeState(options.initialValue);
  const dispatch = (action: StateAction): string | undefined =>
    handleAction(action, state);

  // DOM Nodes
  const elements: Elements = {
    container: element,
    input: null,
    wrapper: null,
  };

  // Email Actions
  const itemActions = makeItemActions({
    elements,
    handleAction: dispatch,
    options,
    state,
  });

  // Event Handlers
  const handlers: Handlers = {
    ...makeInputHandlers(elements, itemActions),
    ...makeEmailHandlers(itemActions),
  };

  // Library Actions
  const libraryActions = makeLibraryActions({
    elements,
    handleAction: dispatch,
    handlers,
    state,
  });

  // Initialize library
  libraryActions.init();

  /**
   * Library's Public API
   *
   * State:
   * - emails
   * - entries
   *
   * Library Methods:
   * - init
   * - destroy
   *
   * Email methods:
   * - add
   * - removeByIndex
   * - removeByName
   *
   */
  return {
    add: itemActions.add,
    destroy: libraryActions.destroy,
    emails: state.emails,
    entries: state.entries,
    init: libraryActions.init,
    removeByIndex: itemActions.removeByIndex,
    removeByName: itemActions.removeByName,
  };
};

export default EmailsInput;

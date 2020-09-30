import { isValidEmail } from '../../utils/isValidEmail';
import { objectValues } from '../../utils/object';
import {
  handleAddAction,
  handleRemoveAction,
  handleUpdateAction,
} from './actions';
import { ActionType, LibraryState } from './constants';
import {
  EmailMapper,
  Entry,
  EntryMap,
  State,
  StateAction,
  StateManager,
} from './types';

/**
 * Library's State Manipulation
 */
export const stateManager = (): StateManager => {
  const id = {
    current: 1,
  };

  /**
   * Return new state
   * @param initialValue
   */
  const makeState = (initialValue: string[]): State => {
    const mapper: EmailMapper = {};

    const entryMap = initialValue.reduce(
      (map: EntryMap, email: string): EntryMap => {
        const newId = String(id.current);
        map[newId] = {
          email,
          isValid: isValidEmail(email),
        };
        mapper[email] = newId;
        id.current++;

        return map;
      },
      {},
    );

    return {
      emails: initialValue,
      entries: objectValues<Entry>(entryMap),
      entryMap,
      mapper,
      state: LibraryState.Initializing,
    };
  };

  /**
   * Process action
   * @param action
   * @param state
   */
  const handleAction = (
    action: StateAction,
    state: State,
  ): string | undefined => {
    switch (action.type) {
      case ActionType.Add: {
        const newId = String(id.current);
        handleAddAction(action, state, newId);
        id.current++;

        return newId;
      }

      case ActionType.Remove: {
        handleRemoveAction(action, state);

        return undefined;
      }

      case ActionType.UpdateState: {
        handleUpdateAction(action, state);

        return undefined;
      }

      default: {
        return undefined;
      }
    }
  };

  return {
    handleAction,
    makeState,
  };
};

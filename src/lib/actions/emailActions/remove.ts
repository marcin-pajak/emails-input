import { ErrorCodes, ErrorWithCode } from '../../../utils/error';
import { remove as removeNode } from '../../../utils/ie11';
import { ChangeType } from '../../constants';
import { removeItemAction } from '../../state/actionCreators';
import { EmailActionsProperties, EmailRemoveActions } from '../types';

/**
 * Throw if not valid payload
 * @param id
 */
const validateEmail = (id?: string): void => {
  if (typeof id === 'undefined') {
    throw new ErrorWithCode('Invalid value.', ErrorCodes.ERR_EMAIL_NOT_FOUND);
  }
};

/**
 * Remove Email Actions
 * @param ItemActionsProperties
 */
export const makeRemoveItemActions = ({
  elements,
  handleAction,
  options,
  state,
}: EmailActionsProperties): EmailRemoveActions => {
  /**
   * Remove item
   * @param localId
   * @private
   */
  const remove = (localId: string): void => {
    const { email } = state.entryMap[localId];

    // Update state
    handleAction(removeItemAction(localId));

    // Update UI
    const node = elements.wrapper?.querySelector(`div[data-id="${localId}"`);
    removeNode(node);

    // Notify listeners
    options.onChange(email, ChangeType.Removed, state.emails);
  };

  /**
   * Remove item by it's internal id
   * @param id
   * @private
   */
  const removeByLocalId = (localId: string): void => {
    if (typeof state.entryMap[localId] === 'undefined') {
      throw new ErrorWithCode('Invalid id.', ErrorCodes.ERR_EMAIL_NOT_FOUND);
    } else {
      remove(localId);
    }
  };

  /**
   * Remove item by index
   * @param index
   * @public
   */
  const removeByIndex = (index: number): void => {
    const name = state.emails[index];
    const id = state.mapper[name];

    validateEmail(id);
    remove(id);
  };

  /**
   * Remove item by name
   * @param name
   * @public
   */
  const removeByName = (name: string): void => {
    const id = state.mapper[name];

    validateEmail(id);
    remove(id);
  };

  return {
    removeByIndex,
    removeByLocalId,
    removeByName,
  };
};

import { ActionType, LibraryState } from './constants';
import { AddEmailAction, RemoveEmailAction, UpdateStateAction } from './types';

/**
 * Add new email
 * @param email
 */
export const addItemAction = (email: string): AddEmailAction => ({
  payload: email,
  type: ActionType.Add,
});

/**
 * Remove email
 * @param id
 */
export const removeItemAction = (id: string): RemoveEmailAction => ({
  payload: id,
  type: ActionType.Remove,
});

/**
 * Update Library's state
 * @param state
 */
export const updateStateAction = (state: LibraryState): UpdateStateAction => ({
  payload: state,
  type: ActionType.UpdateState,
});

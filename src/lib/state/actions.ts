import { isValidEmail } from '../../utils/isValidEmail';
import {
  AddEmailAction,
  RemoveEmailAction,
  State,
  UpdateStateAction,
} from './types';

/**
 * Remove email
 * @param action
 * @param state
 */
export const handleRemoveAction = (
  action: RemoveEmailAction,
  state: State,
): void => {
  const name = state.entryMap[action.payload].email;
  const index = state.emails.indexOf(name);
  delete state.entryMap[action.payload];
  delete state.mapper[name];
  state.entries.splice(index, 1);
  state.emails.splice(index, 1);
};

/**
 * Add email
 * Returns local Id of new email
 * @param action
 * @param state
 * @param newId
 */
export const handleAddAction = (
  action: AddEmailAction,
  state: State,
  newId: string,
): void => {
  const entry = {
    email: action.payload,
    isValid: isValidEmail(action.payload),
  };
  state.emails.push(action.payload);
  state.mapper[action.payload] = newId;
  state.entryMap[newId] = entry;
  state.entries.push(entry);
};

/**
 * Update Library state
 * @param action
 * @param state
 */
export const handleUpdateAction = (
  action: UpdateStateAction,
  state: State,
): void => {
  state.state = action.payload;
};

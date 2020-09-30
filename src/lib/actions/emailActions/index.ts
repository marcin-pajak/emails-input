import { EmailActions, EmailActionsProperties } from '../types';
import { makeAddItemActions } from './add';
import { makeRemoveItemActions } from './remove';

/**
 * Actions to add and remove emails
 * @param properties
 */
export const makeItemActions = (
  properties: EmailActionsProperties,
): EmailActions => ({
  ...makeAddItemActions(properties),
  ...makeRemoveItemActions(properties),
});

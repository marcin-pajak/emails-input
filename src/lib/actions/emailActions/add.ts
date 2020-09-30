import { includes } from '../../../utils/ie11';
import { makeElementFromHTML } from '../../../utils/render';
import { isMultiple } from '../../../utils/typeGuards';
import { emailTemplate } from '../../components/email';
import { ChangeType } from '../../constants';
import { addItemAction } from '../../state/actionCreators';
import { EmailActionsProperties, EmailAddActions } from '../types';

/**
 * Add Email Actions
 * @param EmailActionsProperties
 */
export const makeAddItemActions = ({
  elements,
  handleAction,
  options,
  state,
}: EmailActionsProperties): EmailAddActions => {
  /**
   * Add unique email
   * Returns true when email was added successfully and false when not.
   * @param rawValue
   * @private
   */
  const addSingle = (rawValue: string): boolean => {
    const value = rawValue.trim();

    if (value === '' || includes(state.emails, value)) {
      return false;
    }

    // Update state
    const newEntryId = handleAction(addItemAction(value));

    // Update UI
    if (typeof newEntryId === 'string' && elements.wrapper !== null) {
      const entry = state.entryMap[newEntryId];

      if (typeof entry !== 'undefined') {
        const emailNode = makeElementFromHTML(emailTemplate(entry, newEntryId));
        elements.wrapper.insertBefore(emailNode, elements.input);
      }
    }

    // Notify listeners
    options.onChange(value, ChangeType.Added, state.emails);

    return true;
  };

  /**
   * Adds multiple unique emails.
   * Returns true when all emails were added successfully and false when not.
   * @param value
   * @private
   */
  const addMultiple = (value: string[]): boolean => {
    const results = value.map((email: string): boolean => addSingle(email));

    return !results.some((isSuccess: boolean): boolean => !isSuccess);
  };

  /**
   * Add unique emails in any format.
   * Returns true when added successfully and false when not.
   *
   * Accepts:
   * - array of single emails
   * - string with single email
   * - string with multiple, comma separated emails
   *
   * Examples of @param value:
   * ["email@email.com", "email2@email.com"]
   * "email@email.com, email2@email.com"
   * "email@email.com"
   *
   * @param value
   * @public
   */
  const add = (value: string | string[]): boolean => {
    // Array of emails
    if (isMultiple(value)) {
      return addMultiple(value);
    }

    // Split if value contains multiple, comma separated emails
    const values = value.split(',');

    return addMultiple(values);
  };

  return {
    add,
  };
};

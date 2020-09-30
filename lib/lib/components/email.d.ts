import { EmailActions } from '../actions/types';
import { Entry } from '../state/types';
import { EmailHandlers } from './types';
export declare const EMAIL_CLASSES: {
    removeButton: string;
    root: string;
    text: string;
};
/**
 * Email Component Template
 * @param value
 * @param id
 */
export declare const emailTemplate: (value: Entry, id: string) => string;
/**
 * Email Component Event Handlers
 * @param handlers
 */
export declare const makeEmailHandlers: (handlers: EmailActions) => EmailHandlers;
//# sourceMappingURL=email.d.ts.map
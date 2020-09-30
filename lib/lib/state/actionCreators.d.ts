import { LibraryState } from './constants';
import { AddEmailAction, RemoveEmailAction, UpdateStateAction } from './types';
/**
 * Add new email
 * @param email
 */
export declare const addItemAction: (email: string) => AddEmailAction;
/**
 * Remove email
 * @param id
 */
export declare const removeItemAction: (id: string) => RemoveEmailAction;
/**
 * Update Library's state
 * @param state
 */
export declare const updateStateAction: (state: LibraryState) => UpdateStateAction;
//# sourceMappingURL=actionCreators.d.ts.map
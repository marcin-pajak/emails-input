import { AddEmailAction, RemoveEmailAction, State, UpdateStateAction } from './types';
/**
 * Remove email
 * @param action
 * @param state
 */
export declare const handleRemoveAction: (action: RemoveEmailAction, state: State) => void;
/**
 * Add email
 * Returns local Id of new email
 * @param action
 * @param state
 * @param newId
 */
export declare const handleAddAction: (action: AddEmailAction, state: State, newId: string) => void;
/**
 * Update Library state
 * @param action
 * @param state
 */
export declare const handleUpdateAction: (action: UpdateStateAction, state: State) => void;
//# sourceMappingURL=actions.d.ts.map
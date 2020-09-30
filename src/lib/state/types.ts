import { ActionType, LibraryState } from './constants';

/**
 * State Actions
 */
export interface AddEmailAction {
  payload: string;
  type: typeof ActionType.Add;
}

export interface RemoveEmailAction {
  payload: string;
  type: typeof ActionType.Remove;
}

export interface UpdateStateAction {
  payload: LibraryState;
  type: typeof ActionType.UpdateState;
}

export type StateAction =
  | AddEmailAction
  | RemoveEmailAction
  | UpdateStateAction;

/**
 * State
 */
export interface Entry {
  email: string;
  isValid: boolean;
}

export type LocalId = string;

export type EmailMapper = Record<string, LocalId>;

export type EntryMap = Record<string, Entry>;

export interface State {
  emails: string[];
  entries: Entry[];
  entryMap: EntryMap;
  mapper: EmailMapper;
  state: LibraryState;
}

/**
 * State Manager
 */
export interface StateManager {
  handleAction: (action: StateAction, state: State) => string | undefined;
  makeState: (initialValue: string[]) => State;
}

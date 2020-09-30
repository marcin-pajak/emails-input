import { Elements, Handlers } from '../components/types';
import { Options } from '../options/types';
import { State, StateAction } from '../state/types';

/**
 * Email actions
 */
export interface EmailAddActions {
  add: (value: string | string[]) => boolean;
}

export interface EmailRemoveActions {
  removeByIndex: (index: number) => void;
  removeByLocalId: (localId: string) => void;
  removeByName: (name: string) => void;
}

export type EmailActions = EmailAddActions & EmailRemoveActions;

export interface EmailActionsProperties {
  elements: Elements;
  handleAction: (action: StateAction) => string | undefined;
  options: Options;
  state: State;
}

/**
 * Library actions
 */
export interface LibraryActions {
  destroy: () => void;
  init: () => void;
}

export interface LibraryActionProperties {
  elements: Elements;
  handleAction: (action: StateAction) => string | undefined;
  handlers: Handlers;
  state: State;
}

/**
 * Actions
 */
export type Actions = EmailActions & LibraryActions;

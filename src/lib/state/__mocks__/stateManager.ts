import { LibraryState } from '../constants';
import { State, StateManager } from '../types';

export const stateManager = (): StateManager => ({
  handleAction: jest.fn(),
  makeState: (): State => ({
    emails: ['new@email.com'],
    entries: [
      {
        email: 'new@email.com',
        isValid: true,
      },
    ],
    entryMap: {
      '1': {
        email: 'new@email.com',
        isValid: true,
      },
    },
    mapper: {
      'new@email.com': '1',
    },
    state: LibraryState.Initialized,
  }),
});

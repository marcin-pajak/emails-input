import {
  addItemAction,
  removeItemAction,
  updateStateAction,
} from '../actionCreators';
import { LibraryState } from '../constants';
import { stateManager } from '../stateManager';
import { StateAction } from '../types';

describe('stateManager makeState should', (): void => {
  it('return initial state', (): void => {
    expect.hasAssertions();
    const manager = stateManager();

    expect(manager.makeState([])).toMatchSnapshot();
  });

  it('return initial state with custom value', (): void => {
    expect.hasAssertions();
    const manager = stateManager();

    expect(manager.makeState(['good@email.com'])).toMatchSnapshot();
  });
});

describe('stateManager handleAction should', (): void => {
  it('handle wrong action', (): void => {
    expect.hasAssertions();
    const manager = stateManager();
    const state = manager.makeState([]);

    const result = manager.handleAction(
      ({ type: 'wrong' } as unknown) as StateAction,
      state,
    );

    expect(result).toBeUndefined();
    expect(state).toMatchSnapshot();
  });

  it('handle adding email', (): void => {
    expect.hasAssertions();
    const manager = stateManager();
    const state = manager.makeState([]);

    const result = manager.handleAction(addItemAction('new@email.com'), state);

    expect(result).toBe('1');
    expect(state).toMatchSnapshot();
  });

  it('handle removing email', (): void => {
    expect.hasAssertions();
    const manager = stateManager();
    const state = manager.makeState([]);

    const id = manager.handleAction(addItemAction('new@email.com'), state);
    expect(state.emails).toHaveLength(1);

    const result = manager.handleAction(removeItemAction(id as string), state);

    expect(state.emails).toHaveLength(0);
    expect(result).toBeUndefined();
    expect(state).toMatchSnapshot();
  });

  it('handle updating library state', (): void => {
    expect.hasAssertions();
    const manager = stateManager();
    const state = manager.makeState([]);

    const result = manager.handleAction(
      updateStateAction(LibraryState.Destroyed),
      state,
    );

    expect(result).toBeUndefined();
    expect(state).toMatchSnapshot();
  });
});

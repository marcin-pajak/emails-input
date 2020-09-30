import { stateManager } from '../../state/stateManager';
import { rootTemplate } from '../root';

jest.mock('../../state/stateManager');
jest.mock('../emails');
jest.mock('../input');

describe('root template should', (): void => {
  it('return valid template', (): void => {
    expect.hasAssertions();

    const state = stateManager().makeState([]);

    expect(rootTemplate(state)).toMatchSnapshot();
  });
});

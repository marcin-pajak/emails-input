import { fireEvent, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import EmailsInput from '../../..';
import { inputTemplate } from '../input';

describe('input template should', (): void => {
  it('return valid template', (): void => {
    expect.hasAssertions();

    expect(inputTemplate()).toMatchSnapshot();
  });
});

const ELEMENT_CLASS = 'emails-input';
describe('input component should', (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `<div id="${ELEMENT_CLASS}"></div>`;
    const element = document.querySelector(`#${ELEMENT_CLASS}`) as HTMLElement;
    EmailsInput(element);
  });

  afterEach((): void => {
    const element = document.querySelector(`#${ELEMENT_CLASS}`);
    element?.remove();
  });

  it('handle adding value after comma', async (): Promise<void> => {
    expect.hasAssertions();

    await userEvent.type(screen.getByRole('textbox'), 'some@email.com,');

    expect(await screen.findByText('some@email.com')).not.toBeNull();
  });

  it('handle adding value after enter', async (): Promise<void> => {
    expect.hasAssertions();

    await userEvent.type(screen.getByRole('textbox'), 'some@email.com{enter}');

    expect(await screen.findByText('some@email.com')).not.toBeNull();
  });

  it('handle adding value after blur', async (): Promise<void> => {
    expect.hasAssertions();

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'some@email.com');
    fireEvent.blur(input);

    expect(await screen.findByText('some@email.com')).not.toBeNull();
  });

  it('handle adding value paste', async (): Promise<void> => {
    expect.hasAssertions();

    // eslint-disable-next-line @typescript-eslint/dot-notation
    window['clipboardData'] = {
      getData: jest.fn((): string => 'some@email.com'),
    };
    const input = screen.getByRole('textbox');
    userEvent.paste(input, 'some@email.com');

    expect(await screen.findByText('some@email.com')).not.toBeNull();
  });

  it('not add value after enter', async (): Promise<void> => {
    expect.hasAssertions();

    await userEvent.type(screen.getByRole('textbox'), '  {enter}');

    expect(screen.queryAllByText('  ')).toHaveLength(0);
  });

  it('not add value after blur', async (): Promise<void> => {
    expect.hasAssertions();

    const input = screen.getByRole('textbox');
    await userEvent.type(input, '  ');
    fireEvent.blur(input);

    expect(screen.queryAllByText('  ')).toHaveLength(0);
  });
});

import EmailsInput from '..';
import { CLASSES } from '../lib/constants';

const ELEMENT_CLASS = 'emails-input';

describe('lib EmailsInput should', (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `<div id="${ELEMENT_CLASS}"></div>`;
  });

  afterEach((): void => {
    const element = document.querySelector(`#${ELEMENT_CLASS}`);
    element?.remove();
  });

  it('add emails correctly', (): void => {
    expect.hasAssertions();

    const element = document.querySelector(`#${ELEMENT_CLASS}`) as HTMLElement;
    const library = EmailsInput(element);

    library.add('someemail@email.com');
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(1);

    library.add('');
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(1);

    library.add(['second@email.com', 'third@email.com']);
    const expectedAfterArray = 3;
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(
      expectedAfterArray,
    );

    library.add('another@email.com, andother@email.com');
    const expectedAfterComma = 5;
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(
      expectedAfterComma,
    );
  });

  it('remove emails correctly', (): void => {
    expect.hasAssertions();

    const initialValue = ['one@email.com', 'two@email.com'];
    const element = document.querySelector(`#${ELEMENT_CLASS}`) as HTMLElement;
    const library = EmailsInput(element, { initialValue });
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(
      initialValue.length,
    );

    library.removeByIndex(1);
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(1);
    expect(library.emails).toStrictEqual(['one@email.com']);

    library.removeByName('one@email.com');
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(0);

    expect((): void => library.removeByIndex(1)).toThrow('Invalid value.');
  });

  it('allow to destroy and reinitialize', (): void => {
    expect.hasAssertions();

    const initialValue = ['one@email.com', 'two@email.com'];
    const element = document.querySelector(`#${ELEMENT_CLASS}`) as HTMLElement;
    const library = EmailsInput(element, { initialValue });
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(
      initialValue.length,
    );

    library.destroy();
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(0);
  });
});

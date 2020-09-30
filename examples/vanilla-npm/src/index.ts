import EmailsInput from '@marcin-pajak/emails-input';
import '@marcin-pajak/emails-input/lib/styles.css';

function randomEmails(domain: string) {
  const generated: string[] = [];

  function generate() {
    while (true) {
      const candidate = Math.random().toString(36).slice(7);

      if (generated.indexOf(candidate) === -1) {
        generated.push(candidate);

        return `${candidate}@${domain}`;
      }
    }
  }

  return { generate };
}

function Init() {
  const emailsInputElement = document.querySelector('#emails-input') ;
  const addEmailElement = document.querySelector('[data-js="addEmail"]');
  const countElement = document.querySelector('[data-js="getEmailsCount"]');

  if (emailsInputElement === null) {
    throw new Error("Wrong html.")
  }

  const emailsInput = EmailsInput(emailsInputElement as HTMLElement);
  const generator = randomEmails('email.com');

  function handleAddEmailClick() {
    const newEmail = generator.generate();

    emailsInput.add(newEmail);
  }

  function handleGetEmailsCountClick() {
    const { entries } = emailsInput;
    const validEmailsAmount = entries.filter(function (entry) {
      return Boolean(entry.isValid);
    }).length;

    alert(validEmailsAmount);
  }

  if (addEmailElement !== null) {
    addEmailElement.addEventListener('click', handleAddEmailClick);
  }

  if (countElement !== null) {
    countElement.addEventListener('click', handleGetEmailsCountClick);
  }

  document.removeEventListener('DOMContentLoaded', Init);
}

document.addEventListener('DOMContentLoaded', Init);

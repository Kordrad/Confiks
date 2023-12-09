export class Separator {
  message = '';

  readonly name = 'separator';
  readonly role = 'separator';

  constructor(message: string) {
    this.message = `\n${message}`;
  }
}

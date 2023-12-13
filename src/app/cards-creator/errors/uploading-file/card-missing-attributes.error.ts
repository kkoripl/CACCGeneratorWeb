import {ReadXlsCardError} from "../general/read-xls-card.error";

export class CardMissingAttributesError extends ReadXlsCardError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Card missing attributes', row);
  }
}

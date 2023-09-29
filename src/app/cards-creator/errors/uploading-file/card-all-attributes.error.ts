import {ReadXlsCardError} from "../general/read-xls-card.error";

export class CardAllAttributesError extends ReadXlsCardError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Card has all attributes set', row);
  }
}

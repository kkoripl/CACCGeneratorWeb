import {ReadXlsCardError} from "../general/read-xls-card.error";

export class CardMixedAttributesError extends ReadXlsCardError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Card with both outfielder and gk attributes', row);
  }
}

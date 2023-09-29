import {ReadXlsCardError} from "../general/read-xls-card.error";

export class CardWrongCountryError extends ReadXlsCardError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Card has wrong country', row);
  }
}

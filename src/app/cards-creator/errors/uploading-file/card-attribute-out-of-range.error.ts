import {ReadXlsCardError} from "../general/read-xls-card.error";

export class CardAttributeOutOfRangeError extends ReadXlsCardError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Card has attribute out of range (1-6)', row);
  }
}

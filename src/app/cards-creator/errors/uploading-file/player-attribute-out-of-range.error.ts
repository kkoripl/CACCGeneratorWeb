import {ReadXlsPlayerError} from "../general/read-xls-player.error";

export class PlayerAttributeOutOfRangeError extends ReadXlsPlayerError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Player has attribute out of range (1-6)', row);
  }
}

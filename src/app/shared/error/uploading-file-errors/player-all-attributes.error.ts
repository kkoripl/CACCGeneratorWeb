import {ReadXlsPlayerError} from "../read-xls-player.error";

export class PlayerAllAttributesError extends ReadXlsPlayerError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Player has all attributes set', row);
  }
}

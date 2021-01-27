import {ReadXlsPlayerError} from "../general/read-xls-player.error";

export class PlayerWrongCountryError extends ReadXlsPlayerError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Player has wrong country', row);
  }
}

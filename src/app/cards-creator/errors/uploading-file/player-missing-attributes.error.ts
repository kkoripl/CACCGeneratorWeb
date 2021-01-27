import {ReadXlsPlayerError} from "../general/read-xls-player.error";

export class PlayerMissingAttributesError extends ReadXlsPlayerError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Player missing attributes', row);
  }
}

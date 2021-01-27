import {ReadXlsPlayerError} from "../general/read-xls-player.error";

export class PlayerMixedAttributesError extends ReadXlsPlayerError {
  constructor(row: number) {
    super();
    this.message = this.createMessage('Player with both outfielder and gk attributes', row);
  }
}

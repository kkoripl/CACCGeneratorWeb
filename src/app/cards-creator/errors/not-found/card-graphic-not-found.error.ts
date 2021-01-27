import {CardDrawingError} from "../general/card-drawing.error";

export class CardGraphicNotFoundError extends CardDrawingError {
  constructor(position: string) {
    super();
    this.message = 'Card graphic for position: ' + position + ' not found!';
  }
}

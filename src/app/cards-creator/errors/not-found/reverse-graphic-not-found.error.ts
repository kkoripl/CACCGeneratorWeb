import {CardDrawingError} from "../general/card-drawing.error";

export class ReverseGraphicNotFoundError extends CardDrawingError {
  constructor() {
    super();
    this.message = 'Reverse card graphic not found!';
  }
}

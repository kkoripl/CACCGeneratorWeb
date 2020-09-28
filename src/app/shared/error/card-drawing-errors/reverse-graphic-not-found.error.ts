import {CardDrawingError} from "../card-drawing.error";

export class ReverseGraphicNotFoundError extends CardDrawingError {
  constructor() {
    super();
    this.message = 'Reverse card graphic not found!';
  }
}

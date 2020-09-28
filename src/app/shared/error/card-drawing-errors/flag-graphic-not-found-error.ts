import {CardDrawingError} from "../card-drawing.error";
import {Country} from "../../enums/country";

export class FlagGraphicNotFoundError extends CardDrawingError {
  constructor(country: Country) {
    super();
    this.message = 'App can not find flag graphic for country: ' + country.alpha2code;
  }
}

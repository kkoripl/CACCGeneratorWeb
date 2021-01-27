import {CardDrawingError} from "../general/card-drawing.error";
import {Country} from "../../../common/enums/country";

export class FlagGraphicNotFoundError extends CardDrawingError {
  constructor(country: Country) {
    super();
    this.message = 'App can not find flag graphic for country: ' + country.alpha2code;
  }
}

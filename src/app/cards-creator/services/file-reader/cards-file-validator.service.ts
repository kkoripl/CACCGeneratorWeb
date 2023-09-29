import {Injectable} from "@angular/core";
import * as _ from 'underscore';

import {CountryNameCodes} from "../../../common/enums/country-name-codes";
import {CardAllAttributesError} from "../../errors/uploading-file/card-all-attributes.error";
import {CardMixedAttributesError} from "../../errors/uploading-file/card-mixed-attributes.error";
import {CardFields} from "../../enums/card/cards-fields.enum";
import {CardWrongCountryError} from "../../errors/uploading-file/card-wrong-country.error";
import {CardAttributeOutOfRangeError} from "../../errors/uploading-file/card-attribute-out-of-range.error";
import {CardMissingAttributesError} from "../../errors/uploading-file/card-missing-attributes.error";
import {Countries} from "../../../common/enums/countries";

@Injectable({
  providedIn: 'root'
})
export class CardsFileValidatorService {

  hasAllAttributes = cardData => this.hasGoalkeeperAttributes(cardData) && this.hasOutfielderAttributes(cardData);
  hasMixedAttributes = cardData => this.hasAtLeastOneGkAttr(cardData) && this.hasAtLeastOneOutfielderAttr(cardData);

  public findErrorsInCardData(cardData, countryCoding: CountryNameCodes, row: number) {
    if(this.hasAllAttributes(cardData)) {
      throw new CardAllAttributesError(row);
    } else if (this.hasMixedAttributes(cardData)) {
      throw new CardMixedAttributesError(row);
    } else if (this.hasWrongCountry(cardData[CardFields.COUNTRY], countryCoding)) {
      throw new CardWrongCountryError(row);
    } else if (this.hasAttributeOutOfRange(cardData)) {
      throw new CardAttributeOutOfRangeError(row);
    }
  }

  public checkGoalkeeperDataErrors(cardData: object, row: number) {
    if(!this.hasGoalkeeperAttributes(cardData)) {
      throw new CardMissingAttributesError(row);
    }
  }

  public checkOutfielderDataErrors(cardData: object, row: number) {
    if(!this.hasOutfielderAttributes(cardData)) {
      throw new CardMissingAttributesError(row);
    }
  }

  public checkRefereeDataErrors(cardData: object, row: number) {
    if(!this.hasRefereeAttributes(cardData)) {
      throw new CardMissingAttributesError(row);
    }
  }
  
  public hasGoalkeeperAttributes(cardData: object): boolean {
    return cardData[CardFields.SAVING] != undefined
      && cardData[CardFields.AERIAL_ABILITY] != undefined
      && cardData[CardFields.HANDLING] != undefined;
  }

  public hasAtLeastOneGkAttr(cardData: object): boolean {
    return cardData[CardFields.SAVING] != undefined
      || cardData[CardFields.AERIAL_ABILITY] != undefined
      || cardData[CardFields.HANDLING] != undefined;
  }

  public hasOutfielderAttributes(cardData: object): boolean {
    return cardData[CardFields.PACE] != undefined &&
      cardData[CardFields.DRIBBLING] != undefined &&
      cardData[CardFields.HEADING] != undefined &&
      cardData[CardFields.HIGH_PASS] != undefined &&
      cardData[CardFields.RESILIENCE] != undefined &&
      cardData[CardFields.SHOOTING] != undefined &&
      cardData[CardFields.TACKLING] != undefined;
  }

  public hasAtLeastOneOutfielderAttr(cardData: object): boolean {
    return cardData[CardFields.HEADING] != undefined ||
      cardData[CardFields.SHOOTING] != undefined ||
      cardData[CardFields.TACKLING] != undefined;
  }

  public hasRefereeAttributes(cardData: object): boolean {
    return cardData[CardFields.LENIENCY] != undefined;
  }
  
  public hasWrongCountry(cardCountry: string, countryCoding: CountryNameCodes): boolean {
    return Countries.getCountryBy(cardCountry, countryCoding) === undefined;
  }

  public hasAttributeOutOfRange(cardData) {
    return _.some(Object.values(cardData), function(value) {
      return value < 1 || value > 6;
    });
  }
}

import {Injectable} from "@angular/core";
import * as _ from 'underscore';

import {CountryNameCodes} from "../enums/country-name-codes";
import {PlayerAllAttributesError} from "../error/uploading-file-errors/player-all-attributes.error";
import {PlayerMixedAttributesError} from "../error/uploading-file-errors/player-mixed-attributes.error";
import {CardFields} from "../file-reader/custom-cards-file-reader/cards-fields.enum";
import {PlayerWrongCountryError} from "../error/uploading-file-errors/player-wrong-country.error";
import {PlayerAttributeOutOfRangeError} from "../error/uploading-file-errors/player-attribute-out-of-range.error";
import {PlayerMissingAttributesError} from "../error/uploading-file-errors/player-missing-attributes.error";
import {Countries} from "../enums/countries";

@Injectable({
  providedIn: 'root'
})
export class PlayersFileValidatorService {

  hasAllAttributes = playerData => this.hasGoalkeeperAttributes(playerData) && this.hasOutfielderAttributes(playerData);
  hasMixedAttributes = playerData => this.hasAtLeastOneGkAttr(playerData) && this.hasAtLeastOneOutfielderAttr(playerData);

  public findErrorsInPlayerData(playerData, countryCoding: CountryNameCodes, row: number) {
    if(this.hasAllAttributes(playerData)) {
      throw new PlayerAllAttributesError(row);
    } else if (this.hasMixedAttributes(playerData)) {
      throw new PlayerMixedAttributesError(row);
    } else if (this.hasWrongCountry(playerData[CardFields.COUNTRY], countryCoding)) {
      throw new PlayerWrongCountryError(row);
    } else if (this.hasAttributeOutOfRange(playerData)) {
      throw new PlayerAttributeOutOfRangeError(row);
    }
  }

  public checkGoalkeeperDataErrors(playerData: object, row: number) {
    if(!this.hasGoalkeeperAttributes(playerData)) {
      throw new PlayerMissingAttributesError(row);
    }
  }

  public checkOutfielderDataErrors(playerData: object, row: number) {
    if(!this.hasOutfielderAttributes(playerData)) {
      throw new PlayerMissingAttributesError(row);
    }
  }

  public hasGoalkeeperAttributes(playerData: object): boolean {
    return playerData[CardFields.SAVING] != undefined && playerData[CardFields.AERIAL_ABILITY] != undefined;
  }

  public hasAtLeastOneGkAttr(playerData: object): boolean {
    return playerData[CardFields.SAVING] != undefined || playerData[CardFields.AERIAL_ABILITY] != undefined;
  }

  public hasOutfielderAttributes(playerData: object): boolean {
    return playerData[CardFields.PACE] != undefined &&
      playerData[CardFields.DRIBBLING] != undefined &&
      playerData[CardFields.HEADING] != undefined &&
      playerData[CardFields.HIGH_PASS] != undefined &&
      playerData[CardFields.RESILIENCE] != undefined &&
      playerData[CardFields.SHOOTING] != undefined &&
      playerData[CardFields.TACKLING] != undefined;
  }

  public hasAtLeastOneOutfielderAttr(playerData: object): boolean {
    return playerData[CardFields.HEADING] != undefined ||
      playerData[CardFields.HIGH_PASS] != undefined ||
      playerData[CardFields.SHOOTING] != undefined ||
      playerData[CardFields.TACKLING] != undefined;
  }

  public hasWrongCountry(playerCountry: string, countryCoding: CountryNameCodes): boolean {
    return Countries.getCountryBy(playerCountry, countryCoding) === undefined;
  }

  public hasAttributeOutOfRange(playerData) {
    return _.some(Object.values(playerData), function(value) {
      return value < 1 || value > 6;
    });
  }
}

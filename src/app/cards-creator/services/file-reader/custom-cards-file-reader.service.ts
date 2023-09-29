import {Injectable} from "@angular/core";
import * as XLSX from "xlsx";

import {Card} from "../../models/card/card";
import {FileReaderService} from "../../../common/services/file-reader/file-reader.service";
import {CardFields} from "../../enums/card/cards-fields.enum";
import {Countries} from "../../../common/enums/countries";
import {PersonPosition} from "../../enums/card/person-position";
import {CountryNameCodes} from "../../../common/enums/country-name-codes";
import {CardsFileValidatorService} from "./cards-file-validator.service";
import {NotificationService} from "../../../common/dialogs/notifications/notification.service";

@Injectable({
  providedIn: 'root'
})
export class CustomCardsFileReaderService extends FileReaderService {

  cards: Card[] = [];

  constructor(private dataValidator: CardsFileValidatorService,
              private notifyService: NotificationService) {
    super();
  }

  uploadFile(countryCoding: CountryNameCodes) {
    return new Promise((resolve, reject) => {
      this.notifyService.showInfo("File uploading", "Uploading cards file started");
      this.fileReader.onload = (e) => {
        this.readCardsDataFromXls(this.fileReader.result, countryCoding);
        resolve(this.fileReader.result);
      };

      this.fileReader.readAsBinaryString(this.file);
    });
  }

  private readCardsDataFromXls(data, countryCoding: CountryNameCodes) {
    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    var cardsData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],{header: -1});
    for (let cardDataIdx = 0; cardDataIdx < cardsData.length; cardDataIdx++) {
      var cardData = cardsData[cardDataIdx];
      this.dataValidator.findErrorsInCardData(cardData, countryCoding, cardDataIdx+1);
      this.cards.push(this.buildCardObject(cardData, countryCoding, cardDataIdx+1));
    }
  }

  private buildCardObject(cardData: any, countryCoding: CountryNameCodes, row: number): Card {
    if (this.dataValidator.hasGoalkeeperAttributes(cardData)) {
      return this.buildGoalkeeperObject(cardData, countryCoding);
    }
    if(this.dataValidator.hasOutfielderAttributes(cardData)) {
      this.dataValidator.checkOutfielderDataErrors(cardData, row);
      return this.buildOutfielderObject(cardData, countryCoding);
    }
    if(this.dataValidator.hasRefereeAttributes(cardData)) {
      return this.buildRefereeObject(cardData, countryCoding);
    }
  }

  private buildGoalkeeperObject(cardData: object, countryCoding: CountryNameCodes): Card {
    return new Card(
      cardData[CardFields.NAME],
      Countries.getCountryBy(cardData[CardFields.COUNTRY], countryCoding),
      PersonPosition.GOALKEEPER,
      cardData[CardFields.PACE],
      cardData[CardFields.DRIBBLING],
      undefined,
      cardData[CardFields.HIGH_PASS],
      cardData[CardFields.RESILIENCE],
      undefined,
      undefined,
      cardData[CardFields.SAVING],
      cardData[CardFields.AERIAL_ABILITY],
      cardData[CardFields.HANDLING],
      cardData[CardFields.LENIENCY]);
  }

  private buildOutfielderObject(cardData: object, countryCoding: CountryNameCodes): Card {
      return new Card(
        cardData[CardFields.NAME],
        Countries.getCountryBy(cardData[CardFields.COUNTRY], countryCoding),
        PersonPosition.OUTFIELDER,
        cardData[CardFields.PACE],
        cardData[CardFields.DRIBBLING],
        cardData[CardFields.HEADING],
        cardData[CardFields.HIGH_PASS],
        cardData[CardFields.RESILIENCE],
        cardData[CardFields.SHOOTING],
        cardData[CardFields.TACKLING],
        undefined,
        undefined,
        undefined,
        undefined);
    }

    private buildRefereeObject(cardData: object, countryCoding: CountryNameCodes): Card {
      return new Card(
        cardData[CardFields.NAME],
        Countries.getCountryBy(cardData[CardFields.COUNTRY], countryCoding),
        PersonPosition.REFEREE,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        cardData[CardFields.LENIENCY]);
    }
}

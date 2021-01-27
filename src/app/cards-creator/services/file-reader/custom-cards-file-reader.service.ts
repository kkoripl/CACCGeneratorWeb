import {Injectable} from "@angular/core";
import * as XLSX from "xlsx";

import {Player} from "../../models/player/player";
import {FileReaderService} from "../../../common/services/file-reader/file-reader.service";
import {CardFields} from "../../enums/card/cards-fields.enum";
import {Countries} from "../../../common/enums/countries";
import {PlayerPosition} from "../../enums/player/player-position";
import {CountryNameCodes} from "../../../common/enums/country-name-codes";
import {PlayersFileValidatorService} from "./players-file-validator.service";
import {NotificationService} from "../../../common/dialogs/notifications/notification.service";


@Injectable({
  providedIn: 'root'
})
export class CustomCardsFileReaderService extends FileReaderService {

  players: Player[] = [];

  constructor(private dataValidator: PlayersFileValidatorService,
              private notifyService: NotificationService) {
    super();
  }

  uploadFile(countryCoding: CountryNameCodes) {
    return new Promise((resolve, reject) => {
      this.notifyService.showInfo("File uploading", "Uploading players file started");
      this.fileReader.onload = (e) => {
        this.readPlayersDataFromXls(this.fileReader.result, countryCoding);
        resolve(this.fileReader.result);
      };

      this.fileReader.readAsBinaryString(this.file);
    });
  }

  private readPlayersDataFromXls(data, countryCoding: CountryNameCodes) {
    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    var playersData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],{header: -1});
    for (let playerDataIdx = 0; playerDataIdx < playersData.length; playerDataIdx++) {
      var playerData = playersData[playerDataIdx];
      this.dataValidator.findErrorsInPlayerData(playerData, countryCoding, playerDataIdx+1);
      this.players.push(this.buildPlayerObject(playerData, countryCoding, playerDataIdx+1));
    }
  }

  private buildPlayerObject(playerData: any, countryCoding: CountryNameCodes, row: number): Player {
    if (this.dataValidator.hasGoalkeeperAttributes(playerData)) {
      return this.buildGoalkeeperObject(playerData, countryCoding);
    } else {
      this.dataValidator.checkOutfielderDataErrors(playerData, row);
      return this.buildOutfielderObject(playerData, countryCoding);
    }
  }

  private buildGoalkeeperObject(playerData: object, countryCoding: CountryNameCodes): Player {
    return new Player(
      playerData[CardFields.NAME],
      Countries.getCountryBy(playerData[CardFields.COUNTRY], countryCoding),
      PlayerPosition.GOALKEEPER,
      playerData[CardFields.PACE],
      playerData[CardFields.DRIBBLING],
      undefined,
      playerData[CardFields.HIGH_PASS],
      playerData[CardFields.RESILIENCE],
      undefined,
      undefined,
      playerData[CardFields.SAVING],
      playerData[CardFields.AERIAL_ABILITY],
      playerData[CardFields.HANDLING]);
  }

  private buildOutfielderObject(playerData: object, countryCoding: CountryNameCodes): Player {
      return new Player(
        playerData[CardFields.NAME],
        Countries.getCountryBy(playerData[CardFields.COUNTRY], countryCoding),
        PlayerPosition.OUTFIELDER,
        playerData[CardFields.PACE],
        playerData[CardFields.DRIBBLING],
        playerData[CardFields.HEADING],
        playerData[CardFields.HIGH_PASS],
        playerData[CardFields.RESILIENCE],
        playerData[CardFields.SHOOTING],
        playerData[CardFields.TACKLING],
        undefined,
        undefined,
        undefined);
    }
}

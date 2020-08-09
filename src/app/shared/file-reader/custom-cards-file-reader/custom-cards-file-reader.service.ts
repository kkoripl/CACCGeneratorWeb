import {Injectable} from "@angular/core";
import {Player} from "../../../entities/player/player";
import {FileReaderService} from "../file-reader.service";
import * as XLSX from "xlsx";
import {CardFields} from "./cards-fields.enum";
import {Countries} from "../../enums/countries";
import {PlayerPosition} from "../../enums/player-position";
import {CountryNameCodes} from "../../enums/country-name-codes";

@Injectable({
  providedIn: 'root'
})

export class CustomCardsFileReaderService extends FileReaderService {

  players: Player[] = [];

  isGoalkeeper = player => player[CardFields.SAVING] != undefined;

  constructor() {
    super();
  }

  uploadFile(countryCoding: CountryNameCodes) {
    return new Promise((resolve, reject) => {
      this.fileReader.onload = (e) => {
        this.readPlayersDataFromXls(this.fileReader.result, countryCoding);
        resolve(this.fileReader.result);
      };

      this.fileReader.readAsBinaryString(this.file);
    });
  }

  readPlayersDataFromXls(data, countryCoding: CountryNameCodes) {
    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    var playersData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],{header: -1});
    for (const playerData of playersData) {
      this.players.push(this.buildPlayerObject(playerData, countryCoding));
    }
  }

  buildPlayerObject(playerData: any, countryCoding: CountryNameCodes): Player {
    if(this.isGoalkeeper(playerData)) {
      return new Player(playerData[CardFields.NAME],
        Countries.getCountryBy(playerData[CardFields.COUNTRY], countryCoding),
        PlayerPosition.GOALKEEPER,
        playerData[CardFields.PACE],
        playerData[CardFields.DRIBBLING],
        undefined,
        undefined,
        playerData[CardFields.RESILIENCE],
        undefined,
        undefined,
        playerData[CardFields.SAVING],
        playerData[CardFields.AERIAL_ABILITY]);
    } else {
      return new Player(playerData[CardFields.NAME],
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
        undefined);
    }
  }
}

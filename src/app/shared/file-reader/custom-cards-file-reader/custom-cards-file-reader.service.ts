import {Injectable} from "@angular/core";
import {Player} from "../../../entities/player/player";
import {FileReaderService} from "../file-reader.service";
import * as XLSX from "xlsx";
import {CardFields} from "./cards-fields.enum";

@Injectable({
  providedIn: 'root'
})

export class CustomCardsFileReaderService extends FileReaderService {

  players: Player[] = [];

  isGoalkeeper = player => player[CardFields.SAVING] != undefined;

  constructor() {
    super();
  }

  uploadFile() {
    return new Promise((resolve, reject) => {
      this.fileReader.onload = (e) => {
        this.readPlayersDataFromXls(this.fileReader.result);
        resolve(this.fileReader.result);
      };

      this.fileReader.readAsBinaryString(this.file);
    });
  }

  readPlayersDataFromXls(data) {
    var workbook = XLSX.read(data, {
      type: 'binary'
    });

    var playersData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],{header: -1});
    for (const playerData of playersData) {
      this.players.push(this.buildPlayerObject(playerData));
    }
  }

  buildPlayerObject(playerData: any): Player {
    if(this.isGoalkeeper(playerData)) {
      return new Player(playerData[CardFields.NAME],
        playerData[CardFields.COUNTRY],
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
        playerData[CardFields.COUNTRY],
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

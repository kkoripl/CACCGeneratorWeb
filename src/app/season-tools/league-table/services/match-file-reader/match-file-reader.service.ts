import {Injectable} from "@angular/core";
import {FileReaderService} from "../../../../common/services/file-reader/file-reader.service";
import {Match} from "../../entities/match/match";
import {Team} from "../../entities/team/team";

@Injectable({
  providedIn: 'root'
})

export class MatchFileReaderService extends FileReaderService {
  teams: Team[] = [];
  matches: Match[] = []

  teamExists = newTeamName => this.teams.some( ({name}) => name == newTeamName);

  constructor() {
    super();
  }

  uploadFile() {
    return new Promise((resolve, reject) => {
      this.fileReader.onload = (e) => {
        for (const line of this.fileReader.result.toString().split(/[\r\n]+/)) {
          if (line) {
            let homeTeam = this.retrieveHomeTeamFromResult(line);
            let awayTeam = this.retrieveAwayTeamFromResult(line);
            let homeScore = this.retrieveHomeScoreFromResult(line);
            let awayScore = this.retrieveAwayScoreFromResult(line);

            this.addTeamIfNotExists(homeTeam)
            this.addTeamIfNotExists(awayTeam)
            this.matches.push(new Match(homeTeam, awayTeam, homeScore, awayScore))
          }
        }
        resolve(this.fileReader.result);
      };
      this.fileReader.readAsText(this.file);
    });
  }

  addTeamIfNotExists(teamName: string) {
    if(!this.teamExists(teamName)) {
      this.teams.push(new Team(teamName))
    }
  }

  retrieveHomeTeamFromResult(result: string): string {
    let homeTeam = (/(\w|\s|'|.)+ -/i.exec(result))[0].toString();
    return homeTeam.substr(0, homeTeam.length-2);
  }

  retrieveAwayTeamFromResult(result: string): string {
    let wrongStartChars = 2;
    let wrongResultChars = 4;
    let awayTeam = (/- (\w|\s|'|.)+/i.exec(result))[0].toString();
    return awayTeam.substr(wrongStartChars, awayTeam.length-(wrongStartChars+wrongResultChars));
  }

  retrieveHomeScoreFromResult(result: string): number {
    let homeScore = /\d+:/i.exec(result).toString();
    return Number(homeScore.substring(0, homeScore.length-1));
  }

  retrieveAwayScoreFromResult(result: string): number {
    let homeScore = /:\d+/i.exec(result).toString();
    return Number(homeScore.substring(2, homeScore.length-1));
  }
}




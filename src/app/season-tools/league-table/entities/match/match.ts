export class Match {
  private _homeTeam: string
  private _awayTeam: string
  private _homeScore: number
  private _awayScore: number

  constructor(homeTeam: string, awayTeam: string, homeScore: number, awayScore: number) {
  this._homeTeam = homeTeam;
  this._awayTeam = awayTeam;
  this._homeScore =  homeScore;
  this._awayScore =  awayScore;
  }

  get homeTeam(): string {
    return this._homeTeam;
  }

  get awayTeam(): string {
    return this._awayTeam;
  }

  getWinnerTeam(): string {
    if(this._homeScore > this._awayScore) return this._homeTeam;
    else if(this._homeScore < this._awayScore) return this._awayTeam;
    else return null;
  }

  getHomeGoalsScored(): number {
    return this._homeScore
  }

  getAwayGoalsScored(): number {
    return this._awayScore
  }

  getHomeGoalsConceded(): number {
    return this._awayScore
  }

  getAwayGoalsConceded(): number {
    return this._homeScore
  }
}

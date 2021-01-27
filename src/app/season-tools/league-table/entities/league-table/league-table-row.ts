import {Team} from "../team/team";

export class LeagueTableRow {
  team: Team
  points: number
  goalsScored: number
  goalsConceded: number

  constructor(team: Team, points: number, goalsScored: number, goalsConceded: number) {
    this.team = team;
    this.points = points;
    this.goalsScored = goalsScored;
    this.goalsConceded = goalsConceded;
  }
}

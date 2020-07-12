import { Injectable } from "@angular/core";
import {Team} from "../entities/team/team";
import {Match} from "../entities/match/match";
import {LeagueTableRow} from "../entities/league-table/league-table-row";
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})

export class LeagueTableService  {
  private POINTS_FOR_WIN = 3;
  private POINTS_FOR_DRAW = 1;
  private POINTS_FOR_LOSE = 0;

  playedInTheMatch = (team: Team, match: Match) => {return (match.homeTeam === team.name || match.awayTeam === team.name)}
  isHomeTeam = (team: Team, match: Match) => {return match.homeTeam == team.name}

  constructor() {
  }

  calculateTable(teams: Team[], matches: Match[]): LeagueTableRow[] {
    console.log('calculate table!');
    console.log(teams);
    console.log(matches);
    let leagueTableRows: LeagueTableRow[] = [];

    for (const team of teams) {
      let teamsMatches = matches.filter(match => this.playedInTheMatch(team, match));
      let points = this.calculatePoints(team, teamsMatches);
      let goalsScored = this.calculateGoalsScored(team, teamsMatches);
      let goalsConceded = this.calculateGoalsConceded(team, teamsMatches);

      leagueTableRows.push(new LeagueTableRow(team, points, goalsScored, goalsConceded));
    }
    return _.sortBy(leagueTableRows, 'points').reverse();
  }

  calculatePoints(team: Team, teamsMatches: Match[]): number {
    let points = 0;

    for (const teamMatch of teamsMatches) {
      let winner = teamMatch.getWinnerTeam();
      if (!winner) {
        points += this.POINTS_FOR_DRAW;
      } else if (winner == team.name) {
        points += this.POINTS_FOR_WIN;
      } else {
        points += this.POINTS_FOR_LOSE
      }
    }

    return points;
  }

  calculateGoalsScored(team: Team, teamsMatches: Match[]): number {
    let goalsScored = 0;

    for (const teamMatch of teamsMatches) {
      if (this.isHomeTeam(team, teamMatch)) {
        goalsScored += teamMatch.getHomeGoalsScored();
      } else {
        goalsScored += teamMatch.getAwayGoalsScored();
      }
    }

    return goalsScored;
  }

  calculateGoalsConceded(team: Team, teamsMatches: Match[]): number {
    let goalsConceded = 0;

    for (const teamMatch of teamsMatches) {
      if (this.isHomeTeam(team, teamMatch)) {
        goalsConceded += teamMatch.getHomeGoalsConceded();
      } else {
        goalsConceded += teamMatch.getAwayGoalsConceded();
      }
    }

    return goalsConceded;
  }
}




import {Component, OnInit} from '@angular/core';
import {MatchFileReaderService} from "./services/match-file-reader/match-file-reader.service";
import {LeagueTableRow} from "./entities/league-table/league-table-row";
import {LeagueTableService} from "./league-table.service";

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css']
})
export class LeagueTableComponent implements OnInit {
  leagueTableRows: LeagueTableRow[] = [];
  displayedColumns: string[] = ['team.name', 'points', 'goalsScored', 'goalsConceded'];

  constructor(private matchFileReaderService: MatchFileReaderService,
              private leagueTableService: LeagueTableService) { }

  ngOnInit(): void {
  }

  incomingFile(event) {
    this.matchFileReaderService.incomingFile(event);
  }

  buildTable() {
    this.matchFileReaderService.uploadFile()
      .then( () => {
        this.leagueTableRows = this.leagueTableService.calculateTable(this.matchFileReaderService.teams,
                                                                      this.matchFileReaderService.matches);
        }
      );
  }
}

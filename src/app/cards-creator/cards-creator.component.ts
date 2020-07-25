import { Component, OnInit } from '@angular/core';
import {Player} from "../entities/player/player";
import {CustomCardsFileReaderService} from "../shared/file-reader/custom-cards-file-reader/custom-cards-file-reader.service";
import {MatTableDataSource} from "@angular/material/table";
import {Goalkeeper} from "../entities/player/goalkeeper";
import {Countries} from "../shared/enums/countries";
import {Country} from "../shared/enums/country";

@Component({
  selector: 'app-cards-creator',
  templateUrl: './cards-creator.component.html',
  styleUrls: ['./cards-creator.component.css']
})
export class CardsCreatorComponent implements OnInit {
  displayedColumns: string[] = ['name', 'country', 'pace', 'dribbling', 'heading', 'highPass', 'resilience', 'shooting',
    'tackling', 'saving', 'aerialAbility', 'actions'];

  players = new MatTableDataSource;
  countries: Country[] = Countries.all;

  constructor(private customCardsFileReaderService: CustomCardsFileReaderService) { }

  ngOnInit(): void {
  }

  incomingFile(event) {
    this.customCardsFileReaderService.incomingFile(event);
  }

  uploadFile(){
    this.customCardsFileReaderService.uploadFile().then(() => {
      this.players.data = this.customCardsFileReaderService.players;
    });
  }

  deletePlayer(playerToDelete: Player) {
    var playersInTable = this.players.data;
    const playerToDeleteIdx = this.players.data.findIndex(player => player === playerToDelete);
    playersInTable.splice(playerToDeleteIdx, 1);
    this.players.data = playersInTable;
  }

  addPlayer() {
    var newPlayer = new Goalkeeper("Test", "POL", 1, 2, 3, 4, 5);
    var playersInTable = this.players.data;
    playersInTable.push(newPlayer);
    this.players.data = playersInTable;
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Player} from "../entities/player/player";
import {CustomCardsFileReaderService} from "../shared/file-reader/custom-cards-file-reader/custom-cards-file-reader.service";
import {MatTableDataSource} from "@angular/material/table";
import {Countries} from "../shared/enums/countries";
import {Country} from "../shared/enums/country";
import {CardsPainterService} from "./service/cards-painter.service";

@Component({
  selector: 'app-cards-creator',
  templateUrl: './cards-creator.component.html',
  styleUrls: ['./cards-creator.component.css']
})
export class CardsCreatorComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private canvasCtx: CanvasRenderingContext2D;

  displayedColumns: string[] = ['name', 'country', 'pace', 'dribbling', 'heading', 'highPass', 'resilience', 'shooting',
    'tackling', 'saving', 'aerialAbility', 'actions'];

  players = new MatTableDataSource;
  countries: Country[] = Countries.all;

  constructor(private customCardsFileReaderService: CustomCardsFileReaderService,
              private cardsPainter: CardsPainterService) { }

  ngOnInit(): void {
    this.canvasCtx = this.canvas.nativeElement.getContext('2d');
  }

  drawCard(player: Player) {
    console.log(player);
    if (player.saving === undefined) {
      this.cardsPainter.drawOutfielder(this.canvasCtx,player.name, player.country, player.getOutfielderSkills());
    } else {
      this.cardsPainter.drawGoalkeeper(this.canvasCtx,player.name, player.country, player.getGoalkeeperSkills());
    }
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
    var newPlayer = new Player("Test", "POL", 1, 2, 3, 4, 5, 6, 1, undefined, undefined);
    var playersInTable = this.players.data;
    playersInTable.push(newPlayer);
    this.players.data = playersInTable;
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Player} from "../entities/player/player";
import {CustomCardsFileReaderService} from "../shared/file-reader/custom-cards-file-reader/custom-cards-file-reader.service";
import {MatTableDataSource} from "@angular/material/table";
import {Countries} from "../shared/enums/countries";
import {Country} from "../shared/enums/country";
import {CardsPainterService} from "./service/cards-painter.service";
import {MatDialog} from "@angular/material/dialog";
import {PlayerDialogComponent} from "../shared/dialogs/player-dialog/player-dialog.component";

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
              private cardsPainter: CardsPainterService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.canvasCtx = this.canvas.nativeElement.getContext('2d');
  }

  drawCard(player: Player) {
    if (player.isGoalkeeper()) {
      this.cardsPainter.drawGoalkeeper(this.canvasCtx, player);
    } else {
      this.cardsPainter.drawOutfielder(this.canvasCtx, player);
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

  openAddingPlayerDialog(data: any) {
    data.player = new Player(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    data.action = "Add player";
    const dialogRef = this.dialog.open(PlayerDialogComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result.event != "Cancel") {
        this.addPlayer(result.player);
        this.drawCard(result.player);
      }
    });
  }

  openEditPlayerDialog(player: Player) {
    let data = {player: null, action: null};
    data.player = player;
    data.action = "Edit player";
    const dialogRef = this.dialog.open(PlayerDialogComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result.event != "Cancel") {
        this.drawCard(result.player);
      }
    });
  }

  addPlayer(playerToAdd: any) {
    var newPlayer = new Player(playerToAdd.name, playerToAdd.country, playerToAdd.pace,
      playerToAdd.dribbling, playerToAdd.heading, playerToAdd.highPass, playerToAdd.resilience, playerToAdd.shooting,
      playerToAdd.tackling, playerToAdd.saving, playerToAdd.aerialAbility);

    var playersInTable = this.players.data;
    playersInTable.push(newPlayer);
    this.players.data = playersInTable;
  }
}

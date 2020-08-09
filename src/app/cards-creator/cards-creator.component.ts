import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Player} from "../entities/player/player";
import {CustomCardsFileReaderService} from "../shared/file-reader/custom-cards-file-reader/custom-cards-file-reader.service";
import {MatTableDataSource} from "@angular/material/table";
import {Countries} from "../shared/enums/countries";
import {Country} from "../shared/enums/country";
import {CardsPainterService} from "./service/cards-painter.service";
import {MatDialog} from "@angular/material/dialog";
import {PlayerDialogComponent} from "../shared/dialogs/player-dialog/player-dialog.component";
import {PlayerPosition} from "../shared/enums/player-position";
import {CardsPdfGeneratorService} from "./service/cards-pdf-generator.service";
import {UploadPlayersDialogComponent} from "../shared/dialogs/upload-players-dialog/upload-players-dialog.component";

@Component({
  selector: 'app-cards-creator',
  templateUrl: './cards-creator.component.html',
  styleUrls: ['./cards-creator.component.css']
})
export class CardsCreatorComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private canvasCtx: CanvasRenderingContext2D;

  displayedColumns: string[] = ['name', 'country', 'pace', 'dribbling', 'heading', 'highPass', 'resilience', 'shooting',
    'tackling', 'saving', 'aerialAbility', 'actions'];

  players = new MatTableDataSource;
  data: Player[] = [];
  countries: Country[] = Countries.all;

  constructor(private customCardsFileReaderService: CustomCardsFileReaderService,
              private cardsPainter: CardsPainterService,
              private cardPdfGenerator: CardsPdfGeneratorService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.canvasCtx = this.canvas.nativeElement.getContext('2d');
  }

  drawCard(player: Player) {
    this.cardsPainter.drawCard(this.canvasCtx, player);
  }

  // incomingFile(event) {
  //   this.customCardsFileReaderService.incomingFile(event);
  // }
  //
  // uploadFile(){
  //   this.customCardsFileReaderService.uploadFile().then(() => {
  //     this.data = this.customCardsFileReaderService.players
  //     this.players.data = this.data;
  //   });
  // }

  generatePdf() {
    console.log(this.data);
    console.log(this.players.data);
    this.cardPdfGenerator.generatePdf(this.data, this.canvasCtx);
  }

  deletePlayer(playerToDelete: Player) {
    // var playersInTable = this.data;
    const playerToDeleteIdx = this.data.findIndex(player => player === playerToDelete);
    this.data.splice(playerToDeleteIdx, 1);
    this.players.data = this.data;
  }

  openUploadFileDialog() {
    const dialogRef = this.dialog.open(UploadPlayersDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if(result.players != null) {
            this.data = result.players;
            console.log(this.data);
            this.players.data = this.data;
      }
    })
  }

  openAddingPlayerDialog(data: any) {
    data.player = new Player(undefined, undefined, PlayerPosition.GOALKEEPER, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    data.action = "Add player";
    const dialogRef = this.dialog.open(PlayerDialogComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result.event != undefined) {
        data.player.updatePlayer(result.player);
        this.addPlayer(data.player);
        this.drawCard(data.player);
      }
    });
  }

  openEditPlayerDialog(player: Player) {
    let data = {player: null, action: null};
    data.player = player;
    data.action = "Edit player";
    const dialogRef = this.dialog.open(PlayerDialogComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        player.updatePlayer(result.player);
        this.drawCard(player);
      }
    });
  }

  addPlayer(playerToAdd: any) {
    var newPlayer = new Player(playerToAdd.name, playerToAdd.country, playerToAdd.position, playerToAdd.pace,
      playerToAdd.dribbling, playerToAdd.heading, playerToAdd.highPass, playerToAdd.resilience, playerToAdd.shooting,
      playerToAdd.tackling, playerToAdd.saving, playerToAdd.aerialAbility);

    // var playersInTable = this.players.data;
    this.data.push(newPlayer);
    this.players.data = this.data;
  }
}

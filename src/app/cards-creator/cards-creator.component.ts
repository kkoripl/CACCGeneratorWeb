import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as fileSaver from 'file-saver';
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
import {NotificationService} from "../shared/dialogs/notifications/notification.service";
import {FileDownloadService} from "../shared/file-service/file-download.service";

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
              private dialog: MatDialog,
              private notifyService: NotificationService,
              private fileDownloadService: FileDownloadService) { }

  ngOnInit(): void {
    this.canvasCtx = this.canvas.nativeElement.getContext('2d');
  }

  drawCard(player: Player) {
    this.cardsPainter.drawCard(this.canvasCtx, player);
  }

  generatePdf() {
    this.notifyService.showInfo("Generating PDF", "Creating pdf file started");
    this.cardPdfGenerator.generatePdf(this.data);
  }

  deletePlayer(playerToDelete: Player) {
    const playerToDeleteIdx = this.data.findIndex(player => player === playerToDelete);
    this.data.splice(playerToDeleteIdx, 1);
    this.players.data = this.data;
  }

  openUploadFileDialog() {
    const dialogRef = this.dialog.open(UploadPlayersDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
            this.data = result.players;
            this.players.data = this.data;
      }
    })
  }

  openAddingPlayerDialog(data: any) {
    data.player = new Player(undefined, undefined, PlayerPosition.GOALKEEPER, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    data.action = "Add player";
    const dialogRef = this.dialog.open(PlayerDialogComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result.event != undefined) {
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

    this.data.push(newPlayer);
    this.players.data = this.data;
  }

  downloadExampleXls() {
      this.fileDownloadService.downloadExampleXls().subscribe(response => {
        let blob:any = new Blob([response]);
        fileSaver.saveAs(blob, 'example.xls');
      })
  }

  arePlayersToGenerate(): boolean {
    return Array.isArray(this.players.data) && this.players.data.length != 0;
  }

  getInstructionText(): string {
    return "1. Add new player via 'Add' button or upload XLS file with players. Download example XLS file and change player names, skills and countries which can be named by name, alpha-2 or alpha-3 code in country column. All possible countries are in 'countries' sheet.\n\n2. Preview each added player by clicking on its row in the table!\n\n3. Edit or delete players using action buttons on the right side of the table.\n\n4. Generate pdf and print your cards!";
  }
}

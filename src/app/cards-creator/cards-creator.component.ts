import {Component, OnInit} from '@angular/core';
import * as fileSaver from 'file-saver';
import {Player} from "../entities/player/player";
import {CustomCardsFileReaderService} from "../shared/file-reader/custom-cards-file-reader/custom-cards-file-reader.service";
import {MatTableDataSource} from "@angular/material/table";
import {Countries} from "../shared/enums/countries";
import {Country} from "../shared/enums/country";
import {MatDialog} from "@angular/material/dialog";
import {PlayerDialogComponent} from "../shared/dialogs/player-dialog/player-dialog.component";
import {PlayerPosition} from "../shared/enums/player-position";
import {CardsPdfGeneratorService} from "./service/cards-pdf-generator.service";
import {UploadPlayersDialogComponent} from "../shared/dialogs/upload-players-dialog/upload-players-dialog.component";
import {NotificationService} from "../shared/dialogs/notifications/notification.service";
import {FileDownloadService} from "../shared/file-service/file-download.service";
import {CardsPainterService} from "./service/cards-painter.service";
import {environment} from '../../environments/environment';
import {GradesStyle} from "../shared/enums/grades-style";
import {ReverseCardStyle} from "../shared/enums/reverse-card-style";
import {CardImgDiv} from "../shared/enums/card-img-div";


@Component({
  selector: 'app-cards-creator',
  templateUrl: './cards-creator.component.html',
  styleUrls: ['./cards-creator.component.css']
})
export class CardsCreatorComponent implements OnInit {
  public GradesStyle = GradesStyle;
  public ReverseCardStyle = ReverseCardStyle;
  public CardImgDiv = CardImgDiv;

  displayedColumns: string[] = ['name', 'country', 'pace', 'dribbling', 'heading', 'highPass', 'resilience', 'shooting',
    'tackling', 'saving', 'aerialAbility', 'handling', 'actions'];

  exampleExcelConfig = environment.exampleExcelConfig;

  players = new MatTableDataSource;
  data: Player[] = [];
  countries: Country[] = Countries.all;
  gradesStyle: GradesStyle;
  reverseStyle: ReverseCardStyle;
  addReverses: boolean;
  settingsMenuShown: boolean;
  lastSelectedPlayer: Player;

  constructor(private customCardsFileReaderService: CustomCardsFileReaderService,
              private cardsPainter: CardsPainterService,
              private cardPdfGenerator: CardsPdfGeneratorService,
              private dialog: MatDialog,
              private notifyService: NotificationService,
              private fileDownloadService: FileDownloadService) {
    this.gradesStyle = GradesStyle.HEX;
    this.reverseStyle = ReverseCardStyle.CLASSIC;
    this.addReverses = false;
    this.settingsMenuShown = false;
  }

  ngOnInit(): void {}

  private selectPlayer (player: Player) {
    this.lastSelectedPlayer = player;
  }

  drawCard(player: Player) {
    this.selectPlayer(player);
    this.drawFront(player);
    if (this.addReverses) {
      this.drawReverse();
    }
  }

  drawFront(player: Player) {
    if (player) {
      this.cardsPainter.drawCard(player, this.gradesStyle, CardImgDiv.CARD_FRONT_PREVIEW);
    }
  }

  drawReverse() {
    this.cardsPainter.drawReverse(this.reverseStyle, CardImgDiv.CARD_REVERSE_PREVIEW);
  }

  generatePdf() {
    this.notifyService.showInfo("Generating PDF", "Creating pdf file started");
    this.cardPdfGenerator.generatePdf(this.data, this.gradesStyle, this.addReverses, this.reverseStyle);
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
    data.player = new Player(undefined, undefined, PlayerPosition.GOALKEEPER, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    data.action = "Add player";
    const dialogRef = this.dialog.open(PlayerDialogComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result.event != undefined) {
        data.player.updatePlayer(result.player);
        this.addPlayer(data.player);
        this.selectPlayer(data.player);
        this.drawFront(data.player);
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
        this.selectPlayer(player);
        this.drawFront(player);
      }
    });
  }

  addPlayer(playerToAdd: any) {
    var newPlayer = new Player(playerToAdd.name, playerToAdd.country, playerToAdd.position, playerToAdd.pace,
      playerToAdd.dribbling, playerToAdd.heading, playerToAdd.highPass, playerToAdd.resilience, playerToAdd.shooting,
      playerToAdd.tackling, playerToAdd.saving, playerToAdd.aerialAbility, playerToAdd.handling);

    this.data.push(newPlayer);
    this.players.data = this.data;
  }

  showSettingsMenu() {
    if (this.settingsMenuShown) {
      this.settingsMenuShown = false;
    } else {
      this.settingsMenuShown = true;
    }
  }

  downloadExampleXls() {
      this.fileDownloadService.downloadExampleXls().subscribe(response => {
        let blob:any = new Blob([response]);
        fileSaver.saveAs(blob, this.exampleExcelConfig.fileName);
      })
  }

  arePlayersToGenerate(): boolean {
    return Array.isArray(this.players.data) && this.players.data.length != 0;
  }

  getInstructionText(): string {
    return "1. Add new player via 'Add' button or upload .xls/.xlsx file with players. Download example XLS file and change player names, skills and countries which can be named by name, alpha-2 or alpha-3 code in country column. All possible countries are in 'countries' sheet.\n\n" +
      "2. Preview each added player by clicking on its row in the table!\n\n" +
      "3. Try to customize cards with options available under 'Card settings' button.\n\n" +
      "4. Edit or delete players using action buttons on the right side of the table.\n\n" +
      "5. Generate pdf and print your cards!";
  }
}

import {Component, OnInit} from '@angular/core';
import * as fileSaver from 'file-saver';
import {Card} from "./models/card/card";
import {CustomCardsFileReaderService} from "./services/file-reader/custom-cards-file-reader.service";
import {MatTableDataSource} from "@angular/material/table";
import {Countries} from "../common/enums/countries";
import {Country} from "../common/enums/country";
import {MatDialog} from "@angular/material/dialog";
import {CardDialogComponent} from "./dialogs/new-card/card-dialog.component";
import {PersonPosition} from "./enums/card/person-position";
import {CardsPdfGeneratorService} from "./services/cards-pdf-generator.service";
import {UploadCardsDialogComponent} from "./dialogs/upload-cards/upload-cards-dialog.component";
import {NotificationService} from "../common/dialogs/notifications/notification.service";
import {FileDownloadService} from "./services/file-download.service";
import {CardsPainterService} from "./services/cards-painter.service";
import {environment} from '../../environments/environment';
import {GradesStyle} from "./enums/grades/grades-style";
import {ReverseCardStyle} from "./enums/card/reverse-card-style";
import {CardImgDiv} from "./enums/card-img-div";


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
    'tackling', 'saving', 'aerialAbility', 'handling', 'actions', 'leniency'];

  exampleExcelConfig = environment.exampleExcelConfig;

  cards = new MatTableDataSource;
  data: Card[] = [];
  countries: Country[] = Countries.all;
  gradesStyle: GradesStyle;
  reverseStyle: ReverseCardStyle;
  addReverses: boolean;
  settingsMenuShown: boolean;
  lastSelectedCard: Card;

  constructor(private customCardsFileReaderService: CustomCardsFileReaderService,
              private cardsPainter: CardsPainterService,
              private cardPdfGenerator: CardsPdfGeneratorService,
              private dialog: MatDialog,
              private notifyService: NotificationService,
              private fileDownloadService: FileDownloadService) {
    this.gradesStyle = GradesStyle.CIRCLE;
    this.reverseStyle = ReverseCardStyle.WITH_BALL;
    this.addReverses = true;
    this.settingsMenuShown = false;
  }

  ngOnInit(): void {}

  private selectCard(card: Card) {
    this.lastSelectedCard = card;
  }

  drawCard(card: Card) {
    this.selectCard(card);
    this.drawFront(card);
    if (this.addReverses) {
      this.drawReverse();
    }
  }

  drawFront(card: Card) {
    if (card) {
      this.cardsPainter.drawCard(card, this.gradesStyle, CardImgDiv.CARD_FRONT_PREVIEW);
    }
  }

  drawReverse() {
    this.cardsPainter.drawReverse(this.reverseStyle, CardImgDiv.CARD_REVERSE_PREVIEW);
  }

  generatePdf() {
    this.notifyService.showInfo("Generating PDF", "Creating pdf file started");
    this.cardPdfGenerator.generatePdf(this.data, this.gradesStyle, this.addReverses, this.reverseStyle);
  }

  deleteCard(cardToDelete: Card) {
    const cardToDeleteIdx = this.data.findIndex(card => card === cardToDelete);
    this.data.splice(cardToDeleteIdx, 1);
    this.cards.data = this.data;
  }

  openUploadFileDialog() {
    const dialogRef = this.dialog.open(UploadCardsDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if(result != null) {
            this.data = result.cards;
            this.cards.data = this.data;
      }
    })
  }

  openAddingCardDialog(data: any) {
    data.card = new Card(undefined, undefined, PersonPosition.OUTFIELDER, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    data.action = "Add Card";
    const dialogRef = this.dialog.open(CardDialogComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result.event != undefined) {
        data.card.updateCard(result.card);
        this.addCard(data.card);
        this.selectCard(data.card);
        this.drawFront(data.card);
      }
    });
  }

  openEditCardDialog(card: Card) {
    let data = {card: null, action: null};
    data.card = card;
    data.action = "Edit card";
    const dialogRef = this.dialog.open(CardDialogComponent, {data: data});
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        card.updateCard(result.card);
        this.selectCard(card);
        this.drawFront(card);
      }
    });
  }

  addCard(cardToAdd: any) {
    var newCard = new Card(cardToAdd.name, cardToAdd.country, cardToAdd.position, cardToAdd.pace,
      cardToAdd.dribbling, cardToAdd.heading, cardToAdd.highPass, cardToAdd.resilience, cardToAdd.shooting,
      cardToAdd.tackling, cardToAdd.saving, cardToAdd.aerialAbility, cardToAdd.handling, cardToAdd.leniency);

    this.data.push(newCard);
    this.cards.data = this.data;
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

  areCardsToGenerate(): boolean {
    return Array.isArray(this.cards.data) && this.cards.data.length != 0;
  }

  getInstructionText(): string {
    return "1. Add new card via 'Add' button or upload .xls/.xlsx file with cards. Download example XLS file and change card names, skills and countries which can be named by name, alpha-2 or alpha-3 code in country column. All possible countries are in 'countries' sheet.\n\n" +
      "2. Preview each added card by clicking on its row in the table!\n\n" +
      "3. Try to customize cards with options available under 'Card settings' button.\n\n" +
      "4. Edit or delete cards using action buttons on the right side of the table.\n\n" +
      "5. Generate pdf and print your cards!";
  }
}

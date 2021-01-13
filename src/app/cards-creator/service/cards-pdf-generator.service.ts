import jsPDF from 'jspdf';
import Konva from "konva";

import {Injectable} from "@angular/core";
import {environment} from '../../../environments/environment';
import {Player} from "../../entities/player/player";
import {BrowserService} from "../../shared/browser-service/browser.service";
import {CardsPainterService} from "./cards-painter.service";
import {GradesStyle} from "../../shared/enums/grades-style";
import {ReverseCardStyle} from "../../shared/enums/reverse-card-style";
import {CardImgDiv} from "../../shared/enums/card-img-div";


@Injectable({
  providedIn: 'root'
})

export class CardsPdfGeneratorService {
  private structureConfig = environment.pdfConfig.structure;
  private pdfActionConfig = environment.pdfConfig.pdfAction;
  private cardConfig = environment.pdfConfig.card;
  private metadataConfig = environment.pdfConfig.metadata;

  constructor(private cardsPainterService: CardsPainterService,
              private browserService: BrowserService) {
  }

  generatePdf(players: Player[], gradesStyle: GradesStyle, addReverses: boolean, reverseStyle: ReverseCardStyle) {
    let doc = new jsPDF(); // A4 size page of PDF

    this.addCards(doc, players, gradesStyle, addReverses, reverseStyle, this.structureConfig, this.cardConfig)
      .then(pdf => {
        this.setupPdfMetadata(pdf);
        if (this.browserService.isBrowserWithPopupsSecurity()) {
          this.renderPdfInNewWindow(pdf);
        } else {
          pdf.output(this.pdfActionConfig.type);
        }
      });
  }

  private async addCards(docDefinition: jsPDF, players: Player[], gradesStyle: GradesStyle, reversesNeeded: boolean, reverseStyle: ReverseCardStyle, structureConfig, cardConfig) {
    var firstCardOnPage = false;
    var cardInRowIdx = 0;
    var cardsLeft = 0
    var reversesToAdd = 0;

    var cardX = structureConfig.firstCardXMm;
    var cardY = structureConfig.firstCardYMm;

    for (let cardIdx = 0; cardIdx < players.length; cardIdx++) {
      firstCardOnPage = false;
      cardInRowIdx = this.calcCardInRowIdx(cardIdx, structureConfig.rowSize);

      if (this.cardShouldStartNewPage(cardIdx)) {
        if (this.notFirstCard(cardIdx)) {
          docDefinition.addPage();
        }

        if (reversesNeeded) {
          cardsLeft = this.calcCardsLeft(players.length, cardIdx);
          reversesToAdd = this.calcHowManyReversesToAdd(cardsLeft, structureConfig.pageSize);
          await this.addReverses(docDefinition, reverseStyle, reversesToAdd, structureConfig, cardConfig);
        }

        // reset drawing attributes for new page start
        firstCardOnPage = true;
        cardInRowIdx = 0;
        cardX = structureConfig.firstCardXMm;
        cardY = structureConfig.firstCardYMm;
      }

      if (this.cardShouldStartNextRow(cardInRowIdx, firstCardOnPage, structureConfig.pageSize)) {
        cardInRowIdx = 0;
        cardX = structureConfig.firstCardXMm;
        cardY = this.startNewRow(cardY, structureConfig.cardsRowStartsDistMm);
      }
      cardX = this.calcCardXInPositionOfIdx(structureConfig.firstCardXMm, cardInRowIdx, structureConfig.cardsColStartsDistMm);
      await this.placeCardInPdf(docDefinition, players[cardIdx], gradesStyle, cardX, cardY, cardConfig);
    }

    return docDefinition;
  }

  private async placeCardInPdf(docDefinition: jsPDF, player: Player, gradesStyle: GradesStyle, cardX: number, cardY: number, cardConfig) {
    return new Promise(resolve => {
      this.cardsPainterService.drawCard(player, gradesStyle, CardImgDiv.PDF_CARD_FRONT)
        .then((card) => {
          this.addCardImageToPdf(docDefinition, card, cardX, cardY, cardConfig);
          resolve();
        });
    });
  }

  private async addReverses(docDefinition: jsPDF, style: ReverseCardStyle, reversesToAdd: number, structureConfig, cardConfig) {
    var reverseX = this.calcReversesFirstX(docDefinition, structureConfig.firstCardXMm, cardConfig.widthMm);
    var reverseY = structureConfig.firstCardYMm;
    var firstReverseOnPage = true;
    var reverseInRowIdx = 0;

    for (let reverseIdx = 0; reverseIdx < reversesToAdd; reverseIdx++) {
      reverseInRowIdx = this.calcCardInRowIdx(reverseIdx, structureConfig.rowSize);

      if (this.cardShouldStartNextRow(reverseInRowIdx, firstReverseOnPage, structureConfig.pageSize)) {
        reverseX = this.calcReversesFirstX(docDefinition, structureConfig.firstCardXMm, cardConfig.widthMm);
        reverseY = this.startNewRow(reverseY, structureConfig.cardsRowStartsDistMm);
        reverseInRowIdx = 0;
      }

      reverseX = this.calcCardXInPositionOfIdx(structureConfig.firstCardXMm, reverseInRowIdx, structureConfig.cardsColStartsDistMm);

      docDefinition = await this.addReverse(docDefinition, style, reverseX, reverseY, cardConfig);

      if (firstReverseOnPage) {
        firstReverseOnPage = false;
      }
    }
    docDefinition.addPage();
  }

  private async addReverse(docDefinition: jsPDF, style: ReverseCardStyle, x: number, y: number, cardConfig) {
    return new Promise(resolve => {
      this.cardsPainterService.drawReverse( style, CardImgDiv.PDF_CARD_REVERSE)
        .then((reverse) => {
          this.addCardImageToPdf(docDefinition, reverse, x, y, cardConfig);
          resolve(docDefinition);
        })
    });
  }

  private cardShouldStartNewPage(cardIdx: number): boolean {
    return cardIdx % this.structureConfig.pageSize == 0;
  }

  private cardShouldStartNextRow(cardInRowIdx: number, firstCardOnPage: boolean, maxCardsInRow: number): boolean {
    return !firstCardOnPage && (cardInRowIdx % maxCardsInRow == 0)
  }

  private calcCardsLeft(allCardsCnt: number, actualCardIdx: number) {
    return allCardsCnt - actualCardIdx;
  }

  private calcCardInRowIdx(cardIdx: number, maxCardsOnPage: number): number {
    return cardIdx % maxCardsOnPage;
  }

  private calcCardXInPositionOfIdx(cardX: number, cardIdx: number, distBetweenColumns: number): number {
    return cardX + cardIdx * distBetweenColumns;
  }

  private calcHowManyReversesToAdd(cardsLeft: number, maxCardsOnPage: number): number {
    if (cardsLeft > maxCardsOnPage) {
      return maxCardsOnPage;
    } else {
      return cardsLeft;
    }
  }

  private startNewRow(y: number, distBetweenRows: number): number {
    y += distBetweenRows;
    return y;
  }

  private notFirstCard(cardIdx: number): boolean {
     return cardIdx != 0;
  }

  private setupPdfMetadata(docDefinition: jsPDF) {
    var properties = this.metadataConfig;
    docDefinition.setProperties({properties});
  }

  private renderPdfInNewWindow(docDefinition: jsPDF) {
    var newWindow = window.open('/');
    fetch(docDefinition.output(this.pdfActionConfig.popupsSecurity))
      .then(res => res.blob())
      .then(blob => {
        newWindow.location.href = URL.createObjectURL(blob);
      });
  }

  private calcReversesFirstX(docDefinition: jsPDF, firstCardXMm: number, cardWidthMm: number): number {
    return this.getPageWidth(docDefinition) - (firstCardXMm + cardWidthMm);
  }

  private getPageWidth(docDefinition): number {
    return docDefinition.internal.pageSize.getWidth();
  }

  private addCardImageToPdf(docDefinition: jsPDF, card: Konva.Stage, cardX: number, cardY: number, cardConfig: any) {
    docDefinition.addImage({
      imageData: card.toDataURL({mimeType: cardConfig.imageExt, pixelRatio: cardConfig.pixelRatio}),
      format: cardConfig.fileExt,
      x: cardX,
      y: cardY,
      w: cardConfig.widthMm,
      h: cardConfig.heightMm,
      compression: cardConfig.compression});
  }
}

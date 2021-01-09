import jsPDF from 'jspdf';
import {Injectable} from "@angular/core";
import {Player} from "../../entities/player/player";
import {PathsGeneratorService} from "../../shared/paths-generator/paths-generator.service";
import {ReverseGraphicNotFoundError} from "../../shared/error/card-drawing-errors/reverse-graphic-not-found.error";
import {BrowserService} from "../../shared/browser-service/browser.service";
import {CardsPainterService} from "./cards-painter.service";
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CardsPdfGeneratorService {
  private structureConfig = environment.pdfConfig.structure;
  private pdfActionConfig = environment.pdfConfig.pdfAction;
  private cardConfig = environment.pdfConfig.card;
  private metadataConfig = environment.pdfConfig.metadata;
  private konvaContainerName = "pdfCard";

  private REVERSE_CARD = new Image();

  constructor(private cardsPainter: CardsPainterService,
              private konvaCardsPainter: CardsPainterService,
              private browserService: BrowserService) {
    this.REVERSE_CARD.src = PathsGeneratorService.generateReverseCardPath();
    this.REVERSE_CARD.onerror = () => {throw new ReverseGraphicNotFoundError()};
  }

  generatePdf(players: Player[]) {
    let doc = new jsPDF(); // A4 size page of PDF

    this.addCards(doc, players, false, this.structureConfig, this.cardConfig)
      .then(pdf => {
        this.setupPdfMetadata(pdf);
        if (this.browserService.isBrowserWithPopupsSecurity()) {
          this.renderPdfInNewWindow(pdf);
        } else {
          pdf.output(this.pdfActionConfig.type);
        }
      });
  }

  private async addCards(docDefinition: jsPDF, players: Player[], reversesNeeded: boolean, structureConfig, cardConfig) {
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
          this.addReverses(docDefinition, this.REVERSE_CARD, reversesToAdd, structureConfig, cardConfig);
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
      docDefinition = await this.placeCardInPdf(docDefinition, players[cardIdx], cardX, cardY, cardConfig);
    }

    return docDefinition;
  }

  private async placeCardInPdf(docDefinition: jsPDF, player: Player, cardX: number, cardY: number, cardConfig) {
    return new Promise(resolve => {
      this.konvaCardsPainter.drawCard(player, this.konvaContainerName)
        .then((result) => {
          docDefinition.addImage({
            imageData: result.toDataURL({mimeType: cardConfig.imageExt, pixelRatio: cardConfig.pixelRatio}),
            format: cardConfig.fileExt,
            x: cardX,
            y: cardY,
            w: cardConfig.widthMm,
            h: cardConfig.heightMm,
            compression: cardConfig.compression});
          resolve(docDefinition);
        });
    });
  }

  private addReverses(docDefinition: any, reverseCard: HTMLImageElement, reversesToAdd: number, structureConfig, cardConfig) {
    var reverseX = structureConfig.firstCardXMm;
    var reverseY = structureConfig.firstCardYMm;
    var firstReverseOnPage = true;
    var reverseInRowIdx = 0;

    for (let reverseIdx = 0; reverseIdx < reversesToAdd; reverseIdx++) {
      reverseInRowIdx = this.calcCardInRowIdx(reverseIdx, structureConfig.rowSize);

      if (this.cardShouldStartNextRow(reverseInRowIdx, firstReverseOnPage, structureConfig.pageSize)) {
        reverseX = structureConfig.firstCardXMm;
        reverseY = this.startNewRow(reverseY, structureConfig.cardsRowStartsDistMm);
        reverseInRowIdx = 0;
      }

      reverseX = this.calcCardXInPositionOfIdx(structureConfig.firstCardXMm, reverseInRowIdx, structureConfig.cardsColStartsDistMm);

      docDefinition = this.addReverse(docDefinition, reverseCard, reverseX, reverseY, cardConfig);

      if (firstReverseOnPage) {
        firstReverseOnPage = false;
      }
    }
    docDefinition.addPage();
  }

  private addReverse(docDefinition: any, reverse: any, x: number, y: number, cardConfig) {
    docDefinition.addImage(reverse, cardConfig.fileExt, x, y);
    return docDefinition;
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
}

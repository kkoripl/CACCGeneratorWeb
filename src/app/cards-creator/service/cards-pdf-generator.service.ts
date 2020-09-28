import jsPDF from 'jspdf';
import {Injectable} from "@angular/core";
import {Player} from "../../entities/player/player";
import {CardsPainterService} from "./cards-painter.service";
import {PathsGeneratorService} from "../../shared/paths-generator/paths-generator.service";
import {ReverseGraphicNotFoundError} from "../../shared/error/card-drawing-errors/reverse-graphic-not-found.error";

@Injectable({
  providedIn: 'root'
})

export class CardsPdfGeneratorService {
  private CARDS_ON_PAGE = 16;
  private CARDS_IN_ROW = 4;
  private FIRST_CARD_X = 8.1;
  private FIRST_CARD_Y = 6.6;
  private CARDS_COL_STARTS_DIST = 50;
  private CARDS_ROW_STARTS_DIST = 70;

  private PDF_ACTION_TYPE = "dataurlnewwindow";
  private CARD_IMAGE_EXT = "png";

  private REVERSE_CARD = new Image();

  constructor(private cardsPainter: CardsPainterService) {
    this.REVERSE_CARD.src = PathsGeneratorService.generateReverseCardPath();
    this.REVERSE_CARD.onerror = () => {throw new ReverseGraphicNotFoundError()};
  }

  generatePdf(players: Player[]) {
    let doc = new jsPDF(); // A4 size page of PDF
    let ctx = this.createTemporaryCanvas2dContext(171, 256);

    this.addCards(doc, players, ctx, false)
      .then(pdf => pdf.output(this.PDF_ACTION_TYPE)); // Open PDF in new browser tab
  }

  private createTemporaryCanvas2dContext(width: number, height: number): CanvasRenderingContext2D {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext("2d");
  }

  private async addCards(docDefinition: jsPDF, players: Player[], ctx: CanvasRenderingContext2D, reversesNeeded: boolean) {
    var firstCardOnPage = false;
    var cardInRowIdx = 0;
    var cardsLeft = 0
    var reversesToAdd = 0;

    var cardX = this.FIRST_CARD_X;
    var cardY = this.FIRST_CARD_Y;

    for (let cardIdx = 0; cardIdx < players.length; cardIdx++) {
      firstCardOnPage = false;
      cardInRowIdx = this.calcCardInRowIdx(cardIdx, this.CARDS_IN_ROW);

      if (this.cardShouldStartNewPage(cardIdx)) {
        if (this.notFirstCard(cardIdx)) {
          docDefinition.addPage();
        }

        if (reversesNeeded) {
          cardsLeft = this.calcCardsLeft(players.length, cardIdx);
          reversesToAdd = this.calcHowManyReversesToAdd(cardsLeft, this.CARDS_ON_PAGE);
          this.addReverses(docDefinition, this.REVERSE_CARD, reversesToAdd);
        }

        // reset drawing attributes for new page start
        firstCardOnPage = true;
        cardInRowIdx = 0;
        cardX = this.FIRST_CARD_X;
        cardY = this.FIRST_CARD_Y;
      }

      if (this.cardShouldStartNextRow(cardInRowIdx, firstCardOnPage, this.CARDS_ON_PAGE)) {
        cardInRowIdx = 0;
        cardX = this.FIRST_CARD_X;
        cardY = this.startNewRow(cardY, this.CARDS_ROW_STARTS_DIST);
      }
      cardX = this.calcCardXInPositionOfIdx(this.FIRST_CARD_X, cardInRowIdx, this.CARDS_COL_STARTS_DIST);
      docDefinition = await this.placeCardInPdf(docDefinition, players[cardIdx], cardX, cardY, ctx);
    }

    return docDefinition;
  }

  private async placeCardInPdf(docDefinition: jsPDF, player: Player, cardX: number, cardY: number, ctx: CanvasRenderingContext2D) {
    return new Promise(resolve => {
      this.cardsPainter.drawCard(ctx, player)
        .then(() => {
          docDefinition.addImage(ctx.canvas.toDataURL('image/' + this.CARD_IMAGE_EXT), this.CARD_IMAGE_EXT, cardX, cardY);
          resolve(docDefinition);
        });
    });
  }

  private addReverses(docDefinition: any, reverseCard: HTMLImageElement, reversesToAdd: number) {
    var reverseX = this.FIRST_CARD_X;
    var reverseY = this.FIRST_CARD_Y;
    var firstReverseOnPage = true;
    var reverseInRowIdx = 0;

    for (let reverseIdx = 0; reverseIdx < reversesToAdd; reverseIdx++) {
      reverseInRowIdx = this.calcCardInRowIdx(reverseIdx, this.CARDS_IN_ROW);

      if (this.cardShouldStartNextRow(reverseInRowIdx, firstReverseOnPage, this.CARDS_ON_PAGE)) {
        reverseX = this.FIRST_CARD_X;
        reverseY = this.startNewRow(reverseY, this.CARDS_ROW_STARTS_DIST)
        reverseInRowIdx = 0;
      }

      reverseX = this.calcCardXInPositionOfIdx(this.FIRST_CARD_X, reverseInRowIdx, this.CARDS_COL_STARTS_DIST);

      docDefinition = this.addReverse(docDefinition, reverseCard, reverseX, reverseY);

      if (firstReverseOnPage) {
        firstReverseOnPage = false;
      }
    }
    docDefinition.addPage();
  }

  private addReverse(docDefinition: any, reverse: any, x: number, y: number) {
    docDefinition.addImage(reverse, this.CARD_IMAGE_EXT, x, y);
    return docDefinition;
  }

  private cardShouldStartNewPage(cardIdx: number): boolean {
    return cardIdx % this.CARDS_ON_PAGE == 0;
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
}

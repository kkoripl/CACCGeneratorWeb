import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Injectable} from "@angular/core";
import {Player} from "../../entities/player/player";
import {CardsPainterService} from "./cards-painter.service";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})

export class CardsPdfGeneratorService {

  constructor(private cardsPainter: CardsPainterService) {
  }

  generatePdf(players: Player[], ctx: CanvasRenderingContext2D){
    let docDefinition = { content: [
      {
        text:'This is an sample PDF printed with pdfMake'
      }
      ]
    };
    this.addCards(docDefinition, players, ctx);
    pdfMake.createPdf(docDefinition).open();
  }

  addCards(docDefinition: any, players: Player[], ctx: CanvasRenderingContext2D) {
    for (const player of players) {
      this.addCard(docDefinition, player, ctx);
    }
    console.log(docDefinition);
  }

  addCard(docDefinition: any, player: Player, ctx: CanvasRenderingContext2D) {
    this.cardsPainter.drawCard(ctx, player);
    docDefinition.content.push({
      image: ctx.canvas.toDataURL('image/png')
    });
  }
}

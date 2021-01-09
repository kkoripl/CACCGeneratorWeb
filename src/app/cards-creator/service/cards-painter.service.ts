import {Player} from "../../entities/player/player";
import {PathsGeneratorService} from "../../shared/paths-generator/paths-generator.service";
import {CardGraphicNotFoundError} from "../../shared/error/card-drawing-errors/card-graphic-not-found.error";
import {Country} from "../../shared/enums/country";
import {FlagGraphicNotFoundError} from "../../shared/error/card-drawing-errors/flag-graphic-not-found-error";
import {GradePosition} from "../../shared/enums/grade-position.enum";
import {GradeGraphicNotFoundError} from "../../shared/error/card-drawing-errors/grade-graphic-not-found-error";
import Konva from "konva";
import {Injectable} from "@angular/core";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CardsPainterService {
  private cardImgConfig = environment.cardConfig.card;
  private flagImgConfig = environment.cardConfig.flag;
  private gradeImgConfig = environment.cardConfig.grade;
  private playerNameConfig = environment.cardConfig.playerName;
  private countryNameConfig = environment.cardConfig.countryName;

  constructor(){}

  async drawCard(player: Player, containerName: string): Promise<Konva.Stage> {
    return new Promise(resolve => {
      var stage = this.setupStage(containerName);
      var layer = new Konva.Layer();
      stage.add(layer);
      this.draw(player, layer).then(() => resolve(stage));
    });
  }

  private async draw(player: Player, layer: Konva.Layer) {
    await new Promise(resolve => {
      this.drawCardImage(player, layer, resolve);
    })
  }

  private async drawCardImage(player: Player, layer: Konva.Layer, resolveCallback: any) {
    var image = new Image();
    image.addEventListener('load', () => {
      this.addImageToLayer(layer, image, this.cardImgConfig);
    });
    image.src = this.getPlayerPositionTemplatePath(player);
    image.onerror = () => {throw new CardGraphicNotFoundError(player.position)}

    await this.drawCardElements(player, layer);
    resolveCallback();
  }

  private async drawCardElements(player: Player, layer: Konva.Layer) {
    await new Promise(resolve => {
      this.drawCountryFlagKonva(player.country, layer, resolve)
    });
    if (player.isGoalkeeper()) {
      await this.drawGradesKonva(player.getGoalkeeperSkills(), layer);
    } else {
      await this.drawGradesKonva(player.getOutfielderSkills(), layer);
    }
    this.drawPlayerNameKonva(player.name, layer);
    this.drawCountryNameKonva(player.country, layer);
  }

  private drawPlayerNameKonva(name: string, layer: Konva.Layer) {
    this.addTextToLayer(layer, name, this.playerNameConfig);
  }

  private drawCountryNameKonva(country: Country, layer: Konva.Layer) {
    this.addTextToLayer(layer, country.name, this.countryNameConfig);
  }

  private drawCountryFlagKonva(country: Country, layer: Konva.Layer, resolveCallback: any) {
    let flagImg = new Image();
    flagImg.addEventListener('load', () => {
      this.addImageToLayer(layer, flagImg, this.flagImgConfig);
      resolveCallback();
    });
    flagImg.src = PathsGeneratorService.generateFlagPath(country.alpha2code);
    flagImg.onerror = () => {throw new FlagGraphicNotFoundError(country);}
  }

  private async drawGradesKonva(grades: number[], layer: Konva.Layer) {
    var gradesPromises = [];
    for (let gradeIdx = 0; gradeIdx < grades.length; gradeIdx++) {
      gradesPromises.push(new Promise(resolve => {
        this.drawGradeKonva(grades[gradeIdx], GradePosition.getGradePositionByOrder(gradeIdx+1), layer, resolve);
      }))
    }
    await Promise.all(gradesPromises);
  }

  private drawGradeKonva(grade: number, gradePosition: GradePosition, layer: Konva.Layer, resolveCallback: any) {
    let gradeImg = new Image();
    gradeImg.addEventListener('load', () => {
      this.gradeImgConfig.y = gradePosition.cordinateY;
      this.addImageToLayer(layer, gradeImg, this.gradeImgConfig);
      resolveCallback();
    });
    gradeImg.src = PathsGeneratorService.generateGradesPath(grade);
    gradeImg.onerror = () => {throw new GradeGraphicNotFoundError(grade);}
  }

  private setupStage(containerName: string): Konva.Stage {
    return new Konva.Stage({
      container: containerName,
      width: this.cardImgConfig.widthPx,
      height: this.cardImgConfig.heightPx
    })
  }

  private addImageToLayer(layer: Konva.Layer, imgToAdd: HTMLImageElement, imgConfig) {
    var img = new Konva.Image({
      x: imgConfig.x,
      y: imgConfig.y,
      image: imgToAdd,
      width: imgConfig.widthPx,
      height: imgConfig.heightPx
    });

    layer.add(img);
    layer.batchDraw();
  }

  private addTextToLayer(layer: Konva.Layer, textToAdd: string, textConfig) {
    var fontSize = textConfig.fontSize;

    var txt = new Konva.Text({
      x: textConfig.x,
      y: textConfig.y - fontSize,
      text: textToAdd,
      fontSize: fontSize,
      fontFamily: textConfig.fontName,
      fill: textConfig.color,
    });

    while (txt.width() > textConfig.maxWidthPx) {
      fontSize = fontSize-1;
      txt = new Konva.Text({
        x: textConfig.x,
        y: textConfig.y - fontSize,
        text: textToAdd,
        fontSize: fontSize,
        fontFamily: textConfig.fontName,
        fill: textConfig.color,
      });
    }

    layer.add(txt);
  }

  private getPlayerPositionTemplatePath(player: Player): string {
    if (player.isGoalkeeper()) {
      return PathsGeneratorService.generateGoalkeeperCardPath();
    } else {
      return PathsGeneratorService.generateOutfielderCardPath();
    }
  }
}

import {Injectable} from "@angular/core";
import {GradePosition} from "../../shared/enums/grade-position.enum";
import {Country} from "../../shared/enums/country";
import {Player} from "../../entities/player/player";
import {PathsGeneratorService} from "../../shared/paths-generator/paths-generator.service";
import {FlagGraphicNotFoundError} from "../../shared/error/card-drawing-errors/flag-graphic-not-found-error";
import {GradeGraphicNotFoundError} from "../../shared/error/card-drawing-errors/grade-graphic-not-found-error";
import {CardGraphicNotFoundError} from "../../shared/error/card-drawing-errors/card-graphic-not-found.error";

@Injectable({
  providedIn: 'root'
})

export class CardsPainterService {
  private fontName = "Komika Axis";
  private gkSkillsNo = 5;
  private outfilederSkillsNo = 7;

  constructor(){}

  async drawCard(ctx: CanvasRenderingContext2D, player: Player) {
    var drawPromise = new Promise(resolve => {
      if (player.isGoalkeeper()) {
        this.drawGoalkeeper(ctx, player, resolve);
      } else {
        this.drawOutfielder(ctx, player, resolve);
      }
    })
    await drawPromise;
  }

  private drawOutfielder(ctx: CanvasRenderingContext2D, player: Player, resolveCallback: any) {
    let image = new Image();
    image.onload = (e) => this.drawOutfielderImage(image, ctx, player, resolveCallback);
    image.src = PathsGeneratorService.generateOutfielderCardPath();
    image.onerror = () => {throw new CardGraphicNotFoundError(player.position)}
  }

  private drawGoalkeeper(ctx: CanvasRenderingContext2D, player: Player, resolveCallback: any) {
    let image = new Image();
    image.onload = (e) => this.drawGoalkeeperImage(image, ctx, player, resolveCallback);
    image.src = PathsGeneratorService.generateGoalkeeperCardPath();
    image.onerror = () => {throw new CardGraphicNotFoundError(player.position)}
  }

  private async drawOutfielderImage(img, ctx: CanvasRenderingContext2D, player: Player, resolveCallback: any) {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    await this.drawOutfielderElements(ctx, player);
    resolveCallback();
  }

  private async drawGoalkeeperImage(img, ctx: CanvasRenderingContext2D, player: Player, resolveCallback: any) {
    ctx.drawImage(img, 0, 0, img.width, img.height);
    await this.drawGoalkeeperElements(ctx, player);
    resolveCallback();
  }

  private async drawOutfielderElements(ctx: CanvasRenderingContext2D, player: Player) {
    await this.drawPlayerElements(ctx, player);
    await this.drawOutfielderSkills(ctx, player.getOutfielderSkills());
  }

  private async drawGoalkeeperElements(ctx: CanvasRenderingContext2D, player: Player) {
    await this.drawPlayerElements(ctx, player);
    await this.drawGoalkeeperSkills(ctx, player.getGoalkeeperSkills());
  }

  private async drawPlayerElements(ctx: CanvasRenderingContext2D, player: Player) {
    this.drawPlayerName(ctx, player.name);
    this.drawCountryName(ctx, player.country);
    await new Promise(resolve => {
      this.drawCountryFlag(ctx, player.country, resolve)
    });
  }

  private async drawOutfielderSkills(ctx: CanvasRenderingContext2D, skillGrades: number[]) {
    await this.drawGrades(ctx, skillGrades, this.outfilederSkillsNo);
  }

  private async drawGoalkeeperSkills(ctx: CanvasRenderingContext2D, skillGrades: number[]) {
    await this.drawGrades(ctx, skillGrades, this.gkSkillsNo);
  }

  private drawPlayerName(ctx: CanvasRenderingContext2D, name: string) {
    ctx.font = this.createFont(18, this.fontName)
    ctx.fillText(name,27, 40);
  }

  private drawCountryFlag(ctx: CanvasRenderingContext2D, country: Country, resolveCallback: any) {
    let image = new Image();
    image.src = PathsGeneratorService.generateFlagPath(country.alpha2code);
    image.onload = function() {
      var img = <HTMLImageElement> this;
      ctx.drawImage(img, 26,43, 29, 29);
      resolveCallback();
    }
    image.onerror = () => {throw new FlagGraphicNotFoundError(country);}
  }

  private drawCountryName(ctx: CanvasRenderingContext2D, country: Country) {
    ctx.font = this.createFont(11, this.fontName)
    ctx.fillText(country.name,58, 62);
  }

  private async drawGrades(ctx: CanvasRenderingContext2D, grades: number[], gradesToDrawNo: number) {
    var gradesPromises = [];
    for (let gradeIdx = 0; gradeIdx < gradesToDrawNo; gradeIdx++) {
      gradesPromises.push(new Promise(resolve => {
        this.drawGrade(ctx, grades[gradeIdx], GradePosition.getGradePositionByOrder(gradeIdx + 1), resolve);
      }))
    }
    await Promise.all(gradesPromises);
  }

  private drawGrade(ctx: CanvasRenderingContext2D, grade: number, gradePosition: GradePosition, resolveCallback: any) {
    let image = new Image();
    image.src = PathsGeneratorService.generateGradesPath(grade);
    image.onload = function() {
      var img = <HTMLImageElement> this;
      ctx.drawImage(img, 120, gradePosition.cordinateY, img.width, img.height);
      resolveCallback();
    }
    image.onerror = () => {throw new GradeGraphicNotFoundError(grade);}
  }

  private createFont(size: number, fontName: string) {
    return size + "px " + fontName;
  }
}

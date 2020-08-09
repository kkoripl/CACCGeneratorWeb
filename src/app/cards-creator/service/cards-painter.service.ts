import {Injectable} from "@angular/core";
import {GradePosition} from "../../shared/enums/grade-position.enum";
import {Country} from "../../shared/enums/country";
import {Player} from "../../entities/player/player";
import {PathsGeneratorService} from "../../shared/paths-generator/paths-generator.service";
import {PlayerPosition} from "../../shared/enums/player-position";

@Injectable({
  providedIn: 'root'
})

export class CardsPainterService {
  private fontName = "Komika Axis";

  constructor(){}

  drawCard(ctx: CanvasRenderingContext2D, player: Player) {
    if (player.isGoalkeeper()) {
      this.drawGoalkeeper(ctx, player);
    } else {
      this.drawOutfielder(ctx, player);
    }
  }

  private drawOutfielder(ctx: CanvasRenderingContext2D, player: Player) {
    let image = new Image();
    image.onload = (e) => this.drawOutfielderImage(image, ctx, player);
    image.src = PathsGeneratorService.generateCardPath(PlayerPosition.OUTFIELDER.valueOf());
  }

  private drawGoalkeeper(ctx: CanvasRenderingContext2D, player: Player) {
    let image = new Image();
    image.onload = (e) => this.drawGoalkeeperImage(image, ctx, player);
    image.src = PathsGeneratorService.generateCardPath(PlayerPosition.GOALKEEPER.valueOf());
  }

  private drawOutfielderImage(img, ctx: CanvasRenderingContext2D, player: Player) {
    ctx.drawImage(img, 0,0, img.width, img.height);
    this.drawOutfielderElements(ctx, player);
  }

  private drawGoalkeeperImage(img, ctx: CanvasRenderingContext2D, player: Player) {
    ctx.drawImage(img, 0,0, img.width, img.height);
    this.drawGoalkeeperElements(ctx, player);
  }

  private drawOutfielderElements(ctx: CanvasRenderingContext2D, player: Player) {
    this.drawPlayerElements(ctx, player);
    this.drawOutfielderSkills(ctx, player.getOutfielderSkills());
  }

  private drawGoalkeeperElements(ctx: CanvasRenderingContext2D, player: Player) {
    this.drawPlayerElements(ctx, player);
    this.drawGoalkeeperSkills(ctx, player.getGoalkeeperSkills());
  }

  private drawPlayerElements(ctx: CanvasRenderingContext2D, player: Player) {
    this.drawPlayerName(ctx, player.name);
    this.drawCountryFlag(ctx, player.country);
    this.drawCountryName(ctx, player.country);
  }

  private drawPlayerName(ctx: CanvasRenderingContext2D, name: string) {
    ctx.font = this.createFont(18, this.fontName)
    ctx.fillText(name,27, 40);
  }

  private drawCountryFlag(ctx: CanvasRenderingContext2D, country: Country) {
    let image = new Image();
    image.src = PathsGeneratorService.generateFlagPath(country.alpha2code);
    image.onload = function() {
      var img = <HTMLImageElement> this;
      ctx.drawImage(img, 26,43, 29, 29);
    }
  }

  private drawCountryName(ctx: CanvasRenderingContext2D, country: Country) {
    ctx.font = this.createFont(11, this.fontName)
    ctx.fillText(country.name,58, 62);
  }

  private drawOutfielderSkills(ctx: CanvasRenderingContext2D, skillGrades: number[]) {
    this.drawGrade(ctx, skillGrades[0], GradePosition.ONE);
    this.drawGrade(ctx, skillGrades[1], GradePosition.TWO);
    this.drawGrade(ctx, skillGrades[2], GradePosition.THREE);
    this.drawGrade(ctx, skillGrades[3], GradePosition.FOUR);
    this.drawGrade(ctx, skillGrades[4], GradePosition.FIVE);
    this.drawGrade(ctx, skillGrades[5], GradePosition.SIX);
    this.drawGrade(ctx, skillGrades[6], GradePosition.SEVEN);
  }

  private drawGoalkeeperSkills(ctx: CanvasRenderingContext2D, skillGrades: number[]) {
    this.drawGrade(ctx, skillGrades[0], GradePosition.ONE);
    this.drawGrade(ctx, skillGrades[1], GradePosition.TWO);
    this.drawGrade(ctx, skillGrades[2], GradePosition.THREE);
    this.drawGrade(ctx, skillGrades[3], GradePosition.FOUR);
    this.drawGrade(ctx, skillGrades[4], GradePosition.FIVE);
  }


  private drawGrade(ctx: CanvasRenderingContext2D, grade: number, gradePosition: GradePosition) {
    let image = new Image();
    image.src = PathsGeneratorService.generateGradesPath(grade);
    image.onload = function() {
      var img = <HTMLImageElement> this;
      ctx.drawImage(img, 120, gradePosition.cordinateY, img.width, img.height);
    }
  }

  private createFont(size: number, fontName: string) {
    return size + "px " + fontName;
  }
}

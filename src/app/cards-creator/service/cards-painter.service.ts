import {Injectable} from "@angular/core";
import {GradePosition} from "../../shared/enums/grade-position.enum";
import {Country} from "../../shared/enums/country";

@Injectable({
  providedIn: 'root'
})

export class CardsPainterService {
  private outfielderCardName = "../assets/img/card_patterns/outfielder_real.png";
  private goalkeeperCardName = "../assets/img/card_patterns/gk.png";
  private fontName = "Komika Axis";
  private flagsDirectory = "../assets/img/flags";
  private gradesDirectory = "../assets/img/grades";
  private flagsExt = ".png";
  private gradesExt = ".png";

  constructor(){}

  drawOutfielder(ctx: CanvasRenderingContext2D, name: string, country: Country, skillGrades: number[]) {
    console.log(country);
    let image = new Image();
    image.onload = (e) => this.drawOutfielderImage(image, ctx, name, country, skillGrades);
    image.src = this.outfielderCardName;
  }

  drawGoalkeeper(ctx: CanvasRenderingContext2D, name: string, country: Country, skillGrades: number[]) {
    let image = new Image();
    image.onload = (e) => this.drawGoalkeeperImage(image, ctx, name, country, skillGrades);
    image.src = this.goalkeeperCardName;
  }

  private drawOutfielderImage(img, ctx: CanvasRenderingContext2D, name: string, country: Country, skillGrades: number[]) {
    ctx.drawImage(img, 0,0, img.width, img.height);
    this.drawOutfielderElements(ctx, name, country, skillGrades);
  }

  private drawGoalkeeperImage(img, ctx: CanvasRenderingContext2D, name: string, country: Country, skillGrades: number[]) {
    ctx.drawImage(img, 0,0, img.width, img.height);
    this.drawOutfielderElements(ctx, name, country, skillGrades);
  }

  private drawOutfielderElements(ctx: CanvasRenderingContext2D, name: string, country: Country, skillGrades: number[]) {
    this.drawPlayerElements(ctx, name, country);
    this.drawOutfielderSkills(ctx, skillGrades);
  }

  private drawGoalkeeperElements(ctx: CanvasRenderingContext2D, name: string, country: Country, skillGrades: number[]) {
    this.drawPlayerElements(ctx, name, country);
    this.drawGoalkeeperSkills(ctx, skillGrades);
  }

  private drawPlayerElements(ctx: CanvasRenderingContext2D, name: string, country: Country) {
    this.drawPlayerName(ctx, name);
    this.drawCountryFlag(ctx, country);
    this.drawCountryName(ctx, country);
  }

  private drawPlayerName(ctx: CanvasRenderingContext2D, name: string) {
    ctx.font = this.createFont(18, this.fontName)
    ctx.fillText(name,27, 40);
  }

  private drawCountryFlag(ctx: CanvasRenderingContext2D, country: Country) {
    let image = new Image();
    image.src = this.generateFlagPath(country.alpha2code);
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

  }


  private drawGrade(ctx: CanvasRenderingContext2D, grade: number, gradePosition: GradePosition) {
    let image = new Image();
    image.src = this.generateGradesPath(grade);
    image.onload = function() {
      var img = <HTMLImageElement> this;
      ctx.drawImage(img, 120, gradePosition.cordinateY, img.width, img.height);
    }
  }

  private generateFlagPath(country: string) {
    return this.flagsDirectory + "/" + country + this.flagsExt;
  }

  private generateGradesPath(grade: number) {
    return this.gradesDirectory + "/" + grade + this.gradesExt;
  }

  private createFont(size: number, fontName: string) {
    return size + "px " + fontName;
  }
}

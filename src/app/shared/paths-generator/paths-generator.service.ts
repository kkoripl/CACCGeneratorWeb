import {PlayerPosition} from "../enums/player-position";
import {GradesStyle} from "../enums/grades-style";
import {ReverseCardStyle} from "../enums/reverse-card-style";


export class PathsGeneratorService {

  private static flagsDirectory = "./assets/img/flags/";
  private static gradesDirectory = "./assets/img/grades/";
  private static cardsPatternDirectory = "./assets/img/card_patterns/";

  private static exampleXlsDirectory = "./assets/xls/";
  private static exampleXlsFile = "example.xls"

  private static caLogoDirectory = "./assets/img/"
  private static caLogoFile = "ca_logo.png"

  private static flagsExt = "png";
  private static gradesExt = "png";
  private static cardExt = "png";

  public static generateFlagPath(country: string) {
    return this.flagsDirectory + country + "." + this.flagsExt;
  }

  public static generateGradesPath(grade: number, style: GradesStyle) {
    return this.gradesDirectory + style.directory + "/" + grade + "." + this.gradesExt;
  }

  public static generateOutfielderCardPath(): string {
    return this.generateCardPath(PlayerPosition.OUTFIELDER.valueOf());
  }

  public static generateGoalkeeperCardPath(): string {
    return this.generateCardPath(PlayerPosition.GOALKEEPER.valueOf());
  }

  public static generateReverseCardPath(style: ReverseCardStyle): string {
    return this.generateCardPath(style.fileName);
  }

  private static generateCardPath(cardPattern: string): string {
    return this.cardsPatternDirectory + cardPattern + "." + this.cardExt;
  }

  public static generateExampleXlsPath(): string {
    return this.exampleXlsDirectory + this.exampleXlsFile;
  }

  public static getCaLogoPath(): string {
    return this.caLogoDirectory + this.caLogoFile;
  }
}

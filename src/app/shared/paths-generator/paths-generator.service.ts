import {PlayerPosition} from "../enums/player-position";

export class PathsGeneratorService {

  private static flagsDirectory = "../assets/img/flags/";
  private static gradesDirectory = "../assets/img/grades/";
  private static cardsPatternDirectory = "../assets/img/card_patterns/";

  private static exampleXlsDirectory = "../assets/xls/";
  private static exampleXlsFile = "example.xls"

  private static flagsExt = "png";
  private static gradesExt = "png";
  private static cardExt = "png";

  public static generateFlagPath(country: string) {
    return this.flagsDirectory + country + "." + this.flagsExt;
  }

  public static generateGradesPath(grade: number) {
    return this.gradesDirectory + grade + "." + this.gradesExt;
  }

  public static generateOutfielderCardPath(): string {
    return this.generateCardPath(PlayerPosition.OUTFIELDER.valueOf());
  }

  public static generateGoalkeeperCardPath(): string {
    return this.generateCardPath(PlayerPosition.GOALKEEPER.valueOf());
  }

  public static generateReverseCardPath(): string {
    return this.generateCardPath("card_reverse");
  }

  private static generateCardPath(cardPattern: string): string {
    return this.cardsPatternDirectory + cardPattern + "." + this.cardExt;
  }

  public static generateExampleXlsPath(): string {
    return this.exampleXlsDirectory + this.exampleXlsFile;
  }
}

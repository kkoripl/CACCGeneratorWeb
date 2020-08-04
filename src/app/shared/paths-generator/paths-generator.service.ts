export class PathsGeneratorService {

  private static flagsDirectory = "../assets/img/flags/";
  private static gradesDirectory = "../assets/img/grades/";
  private static cardsPatternDirectory = "../assets/img/card_patterns/";

  private static flagsExt = ".png";
  private static gradesExt = ".png";
  private static cardExt = ".png";

  public static generateFlagPath(country: string) {
    return this.flagsDirectory + country + this.flagsExt;
  }

  public static generateGradesPath(grade: number) {
    return this.gradesDirectory + grade + this.gradesExt;
  }

  public static generateCardPath(cardPattern: string) {
    return this.cardsPatternDirectory + cardPattern + this.cardExt;
  }
}

export class ReverseCardStyle {
  public static CLASSIC = new ReverseCardStyle('Classic', 'classic_card_reverse')
  public static WITH_BALL = new ReverseCardStyle('With ball', 'with_ball_card_reverse')

  name: string;
  fileName: string

  private constructor(name: string, fileName: string) {
    this.name = name;
    this.fileName = fileName;
  }
}

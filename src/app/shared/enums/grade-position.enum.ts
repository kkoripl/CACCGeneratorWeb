export class GradePosition {
  public static ONE = new GradePosition(1, 73);
  public static TWO = new GradePosition(2, 94);
  public static THREE = new GradePosition(3, 115);
  public static FOUR = new GradePosition(4, 135);
  public static FIVE = new GradePosition(5, 155);
  public static SIX = new GradePosition(6, 176);
  public static SEVEN = new GradePosition(7, 196);

  private static ALL = [GradePosition.ONE, GradePosition.TWO, GradePosition.THREE, GradePosition.FOUR, GradePosition.FIVE, GradePosition.SIX, GradePosition.SEVEN];
  orderNo: number;
  cordinateY: number;

  private constructor(orderNo: number, cordinateY: number) {
    this.orderNo = orderNo;
    this.cordinateY = cordinateY;
  }

  public static getGradePositionByOrder(orderNo: number) {
    return GradePosition.ALL.find(position => position.orderNo === orderNo);
  }
}

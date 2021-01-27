export class GradePosition {
  public static ONE = new GradePosition(1, 69);
  public static TWO = new GradePosition(2, 89);
  public static THREE = new GradePosition(3, 109);
  public static FOUR = new GradePosition(4, 129);
  public static FIVE = new GradePosition(5, 149);
  public static SIX = new GradePosition(6, 169);
  public static SEVEN = new GradePosition(7, 189);

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

import {CardDrawingError} from "../card-drawing.error";

export class GradeGraphicNotFoundError extends CardDrawingError {
  constructor(grade: number) {
    super();
    this.message = 'App can not find grade graphic for grade: ' + grade;
  }
}

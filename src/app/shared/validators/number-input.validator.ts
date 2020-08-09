import {FormControl} from "@angular/forms";

export class NumberInputValidator {
  static validSkillValue(control: FormControl): any {
    return NumberInputValidator.valueBetween(control, 1,6);
  }

  private static valueBetween(control: FormControl, min: number, max: number): boolean {
    return control.value >= min && control.value <= max;
  }
}

import {AbstractControl, ValidatorFn} from "@angular/forms";

export class NumberInputValidator {
  static validSkillValue(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return !NumberInputValidator.valueBetween(control, 1,6) ? {forbiddenName: {value: control.value}} : null;
    };
  }

  private static valueBetween(control: AbstractControl, min: number, max: number): boolean {
    return control.value >= min && control.value <= max;
  }
}

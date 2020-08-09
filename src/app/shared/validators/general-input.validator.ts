import {FormControl} from "@angular/forms";

export class GeneralInputValidator {
  static notNull(control: FormControl) {
    return control.value != null;
  }
}

import {AbstractControl, ValidatorFn} from "@angular/forms";
import * as _ from 'underscore';

import {FileExtension} from "../enums/file-extension";

export class FileInputValidator {
  static validType(acceptedFileTypes: FileExtension[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return !FileInputValidator.fileIsOnOf(control.value, acceptedFileTypes)
              ? {forbiddenName: {value: control.value}} : null;
    };
  }

  private static fileIsOnOf(filePath: string, acceptedFileTypes: FileExtension[]): boolean {
    var extension = filePath.substring(filePath.lastIndexOf("."));
    return _.map(acceptedFileTypes, function(acceptedType) {return acceptedType})
            .includes(extension)
  }
}

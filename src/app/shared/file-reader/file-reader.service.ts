import {Injectable} from "@angular/core";
import * as _ from 'underscore';

import {FileExtension} from "../enums/file-extension";

@Injectable({
  providedIn: 'root'
})

export class FileReaderService {
  file: File;
  fileReader: FileReader;
  data: any[][];

  constructor() {
    this.fileReader = new FileReader();
  }

  incomingFile(event) {
      this.file = event.target.files[0];
  }

  prepareFileToUpload() {
    return new Promise((resolve, reject) => {
      this.fileReader.onload = function (e) {
        resolve(this.result);
      };

      this.fileReader.onerror = function (ex) {
      };

      this.fileReader.readAsBinaryString(this.file);
    });
  }

  fileIsOneOf(file: File, acceptedFileTypes: FileExtension[]): boolean {
    return _.map(acceptedFileTypes, function(acceptedType) {return acceptedType})
            .includes(file.type);
  }
}

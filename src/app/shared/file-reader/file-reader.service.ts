import { Injectable } from "@angular/core";

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
        console.log(ex);
      };

      this.fileReader.readAsBinaryString(this.file);
    });
  }
}

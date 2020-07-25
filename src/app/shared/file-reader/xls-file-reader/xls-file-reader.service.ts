import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";
import {FileReaderService} from "../file-reader.service";

@Injectable({
  providedIn: 'root'
})

export class XlsFileReaderService extends FileReaderService {

  constructor() {
    super();
  }

  uploadFile() {
    return new Promise((resolve, reject) => {
      this.fileReader.onload = function (e) {
        resolve(this.result);
      };

      this.fileReader.onerror = function (ex) {
        console.log(ex);
      };

      this.fileReader.readAsBinaryString(this.file);
    });

    return new Promise((resolve, reject) => {
      this.prepareFileToUpload().then((data) => {
        var workbook = XLSX.read(data, {
          type: 'binary'
        });

        this.data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:1});
        console.log(this.data);
      });
    });
  }
}




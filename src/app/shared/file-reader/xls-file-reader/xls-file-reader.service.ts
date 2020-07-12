import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";
import {FileReaderService} from "../file-reader.service";

type AOA = any[][];

@Injectable({
  providedIn: 'root'
})

export class XlsFileReaderService extends FileReaderService {
  data: AOA = [[1,2],[3,4]];

  constructor() {
    super();
  }

  uploadFile() {
    return new Promise((resolve, reject) => {
      this.prepareFileToUpload().then((data) => {
        var workbook = XLSX.read(data, {
          type: 'binary'
        });

        this.data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:1});
        console.log(this.data);
      }).then(() => console.log(this.data));
    });
  }
}




import { Component, OnInit } from '@angular/core';
import { XlsFileReaderService} from "./xls-file-reader.service";

@Component({
  selector: 'app-xls-reader',
  templateUrl: './xls-reader.component.html',
  styleUrls: ['./xls-reader.component.css']
})
export class XlsReaderComponent implements OnInit{

  data: any[][];

  constructor(private xlsReaderService: XlsFileReaderService) {

  }

  incomingFile(event) {
    this.xlsReaderService.incomingFile(event);
  }

  uploadFile() {
    this.xlsReaderService.uploadFile()
      .then(() => this.data = this.xlsReaderService.data);
  }

  ngOnInit(): void {
  }

}

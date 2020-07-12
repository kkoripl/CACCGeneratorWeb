import { Component, OnInit } from '@angular/core';
import {MatchFileReaderService} from "./match-file-reader.service";

@Component({
  selector: 'app-match-file-reader',
  templateUrl: './match-file-reader.component.html',
  styleUrls: ['./match-file-reader.component.css']
})
export class MatchFileReaderComponent implements OnInit {

  constructor(private matchFileReaderService: MatchFileReaderService) { }

  ngOnInit(): void {

  }

  incomingFile(event) {
    this.matchFileReaderService.incomingFile(event);
  }

  uploadFile() {
    this.matchFileReaderService.uploadFile();
  }

}

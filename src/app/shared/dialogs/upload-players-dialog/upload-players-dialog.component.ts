import {Component} from "@angular/core";
import {CustomCardsFileReaderService} from "../../file-reader/custom-cards-file-reader/custom-cards-file-reader.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CountryNameCodes} from "../../enums/country-name-codes";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "upload-players-dialog",
  templateUrl: "./upload-players-dialog.component.html",
  styleUrls: ["./upload-players-dialog.css"]
})

export class UploadPlayersDialogComponent {

  public countryForm: FormGroup;
  CountryNameCodes = CountryNameCodes;
  private fileChoosen: boolean = false;

  constructor(private customCardsFileReaderService: CustomCardsFileReaderService,
              private dialogRef: MatDialogRef<UploadPlayersDialogComponent>) {
    this.buildFormConfig();
  }

  incomingFile(event) {
    this.customCardsFileReaderService.incomingFile(event);
    this.fileChoosen = true;
  }

  uploadFile(countryCoding: CountryNameCodes) {
    this.customCardsFileReaderService.uploadFile(countryCoding).then(() => {
      this.dialogRef.close({players: this.customCardsFileReaderService.players});
    });
  }

  private buildFormConfig() {
    this.countryForm = new FormGroup({
      countryCoding: new FormControl(CountryNameCodes.NAME, [Validators.required])
    })
  }

  fileWasChoosen() {
    return this.fileChoosen;
  }

  closeDialog(){
    this.dialogRef.close();
  }
}

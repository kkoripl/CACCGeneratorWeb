import {Component} from "@angular/core";
import {CustomCardsFileReaderService} from "../../services/file-reader/custom-cards-file-reader.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CountryNameCodes} from "../../../common/enums/country-name-codes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileExtension} from "../../../common/enums/file-extension";
import {FileInputValidator} from "../../../common/validators/file-input.validator";

@Component({
  selector: "upload-cards-dialog",
  templateUrl: "./upload-cards-dialog.component.html",
  styleUrls: ["./upload-cards-dialog.css"]
})

export class UploadCardsDialogComponent {

  public uploadForm: FormGroup;
  public file;
  CountryNameCodes = CountryNameCodes;


  constructor(private customCardsFileReaderService: CustomCardsFileReaderService,
              private dialogRef: MatDialogRef<UploadCardsDialogComponent>) {
    this.buildFormConfig();
  }

  incomingFile(event) {
    this.customCardsFileReaderService.incomingFile(event);
    this.file = this.customCardsFileReaderService.file.name;
  }

  uploadFile(countryCoding: CountryNameCodes) {
    this.customCardsFileReaderService.uploadFile(countryCoding).then(() => {
      this.dialogRef.close({cards: this.customCardsFileReaderService.cards});
    });
  }

  private buildFormConfig() {
    this.uploadForm = new FormGroup({
      countryCoding: new FormControl(CountryNameCodes.NAME, [Validators.required]),
      file: new FormControl("", [Validators.required,
      FileInputValidator.validType([FileExtension.XLS, FileExtension.XLSX])])
    })
  }

  validUploadData(): boolean {
    return this.uploadForm.valid;
  }

  closeDialog(){
    this.dialogRef.close();
  }
}

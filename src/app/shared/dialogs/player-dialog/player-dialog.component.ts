import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Countries} from "../../enums/countries";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NumberInputValidator} from "../../validators/number-input.validator";
import {PlayerPosition} from "../../enums/player-position";
import {PlayerAttributeGroups} from "../../enums/player-attribute-groups";

@Component({
  selector: 'player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.css']
})

export class PlayerDialogComponent implements OnInit {

  public action;
  public countries = Countries.all;
  public playerForm: FormGroup;
  public PlayerPosition = PlayerPosition;
  public PlayerAttributeGroups = PlayerAttributeGroups;

  private attrsToNotBeCleared = ['name', 'country', 'position'];

  constructor(private dialogRef: MatDialogRef<PlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.createFormControls(data);
  }

  ngOnInit(): void {

  }

  createFormControls(data: any): void {
    this.playerForm = new FormGroup({
      general: new FormGroup({
        name: new FormControl(data.player.name, [Validators.required]),
        country: new FormControl(data.player.country, [Validators.required]),
        position: new FormControl(data.player.position, [Validators.required]),
        dribbling: new FormControl(data.player.dribbling, [Validators.required, NumberInputValidator.validSkillValue]),
        pace: new FormControl(data.player.pace, [Validators.required, NumberInputValidator.validSkillValue]),
        resilience: new FormControl(data.player.resilience, [Validators.required, NumberInputValidator.validSkillValue])
      }),
      goalkeeper: new FormGroup({
        aerialAbility: new FormControl(data.player.aerialAbility,[Validators.required, NumberInputValidator.validSkillValue]),
        saving: new FormControl(data.player.saving, [Validators.required, NumberInputValidator.validSkillValue]),
      }),
      outfielder: new FormGroup({
        heading: new FormControl(data.player.heading, [Validators.required, NumberInputValidator.validSkillValue]),
        highPass: new FormControl(data.player.highPass, [Validators.required, NumberInputValidator.validSkillValue]),
        shooting: new FormControl(data.player.shooting, [Validators.required, NumberInputValidator.validSkillValue]),
        tackling: new FormControl(data.player.tackling, [Validators.required, NumberInputValidator.validSkillValue])
      })
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  doAction(){
    this.dialogRef.close({event: this.action, player: this.playerForm.value});
  }

  validPlayerData(): boolean {
    if (this.playerForm.value.general.position === PlayerPosition.GOALKEEPER) {
      return this.playerForm.get(PlayerAttributeGroups.GENERAL.valueOf()).valid
        && this.playerForm.get(PlayerAttributeGroups.GOALKEEPER.valueOf()).valid;
    } else {
      return this.playerForm.get(PlayerAttributeGroups.GENERAL.valueOf()).valid
        && this.playerForm.get(PlayerAttributeGroups.OUTFIELDER.valueOf()).valid;
    }
  }

  handlePositionChange() {
    this.clearSkillsInFormExcept(this.attrsToNotBeCleared);
  }

  playerIsOutfielder(): boolean {
    return this.playerForm.get('general').value.position === PlayerPosition.OUTFIELDER;
  }

  private clearSkillsInFormExcept(attrsExceptions: string[]) {
    for (const attributesGroup of this.generateArray(this.playerForm.controls)) {
      for (const attribute of this.generateArray(this.playerForm.get(attributesGroup).value)){
        if (!attrsExceptions.includes(attribute) &&
          this.playerForm.get(attributesGroup).get(attribute).value !== null) {
          this.playerForm.get(attributesGroup).get(attribute).reset();
        }
      }
    }
  }

  private generateArray(obj){
    return Object.keys(obj);
  }
}

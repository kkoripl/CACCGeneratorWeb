import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Countries} from "../../../common/enums/countries";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NumberInputValidator} from "../../validators/number-input.validator";
import {PersonPosition} from "../../enums/card/person-position";
import {CardAttributeGroups} from "../../enums/card/card-attribute-groups";

@Component({
  selector: 'card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.css']
})

export class CardDialogComponent implements OnInit {

  public action;
  public countries = Countries.all;
  public cardForm: FormGroup;
  public CardPosition = PersonPosition;
  public CardAttributeGroups = CardAttributeGroups;

  private attrsToNotBeCleared = ['name', 'country', 'position'];

  constructor(private dialogRef: MatDialogRef<CardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.createFormControls(data);
  }

  ngOnInit(): void {
  }

  createFormControls(data: any): void {
    this.cardForm = new FormGroup({
      general: new FormGroup({
        name: new FormControl(data.card.name, [Validators.required]),
        country: new FormControl(data.card.country, [Validators.required]),
        position: new FormControl(data.card.position, [Validators.required]),
        dribbling: new FormControl(data.card.dribbling, [Validators.required, NumberInputValidator.validSkillValue()]),
        pace: new FormControl(data.card.pace, [Validators.required, NumberInputValidator.validSkillValue()]),
        resilience: new FormControl(data.card.resilience, [Validators.required, NumberInputValidator.validSkillValue()]),
        highPass: new FormControl(data.card.highPass, [Validators.required, NumberInputValidator.validSkillValue()])
      }),
      goalkeeper: new FormGroup({
        aerialAbility: new FormControl(data.card.aerialAbility,[Validators.required, NumberInputValidator.validSkillValue()]),
        saving: new FormControl(data.card.saving, [Validators.required, NumberInputValidator.validSkillValue()]),
        handling: new FormControl(data.card.handling, [Validators.required, NumberInputValidator.validSkillValue()])
      }),
      outfielder: new FormGroup({
        heading: new FormControl(data.card.heading, [Validators.required, NumberInputValidator.validSkillValue()]),
        shooting: new FormControl(data.card.shooting, [Validators.required, NumberInputValidator.validSkillValue()]),
        tackling: new FormControl(data.card.tackling, [Validators.required, NumberInputValidator.validSkillValue()])
      }),
      referee: new FormGroup({
        leniency: new FormControl(data.card.leniency, [Validators.required, NumberInputValidator.validSkillValue()])
      })
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  doAction(){
    this.dialogRef.close({event: this.action, card: this.cardForm.value});
  }

  validCardData(): boolean {
    if (this.cardForm.value.general.position === PersonPosition.GOALKEEPER) {
      return this.cardForm.get(CardAttributeGroups.GENERAL.valueOf()).valid
        && this.cardForm.get(CardAttributeGroups.GOALKEEPER.valueOf()).valid;
    }
    if(this.cardForm.value.general.position === PersonPosition.OUTFIELDER) {
      return this.cardForm.get(CardAttributeGroups.GENERAL.valueOf()).valid
        && this.cardForm.get(CardAttributeGroups.OUTFIELDER.valueOf()).valid;
    }
    if(this.cardForm.value.general.position === PersonPosition.REFEREE) {
      return this.cardForm.get(CardAttributeGroups.GENERAL.valueOf()).valid
        && this.cardForm.get(CardAttributeGroups.REFEREE.valueOf()).valid;
    }
    console.log('Card data is invalid');
  }

  handlePositionChange() {
    this.clearSkillsInFormExcept(this.attrsToNotBeCleared);
  }

  cardIsOutfielder(): boolean {
    return this.cardForm.get('general').value.position === PersonPosition.OUTFIELDER;
  }

  cardIsGoalkeeper(): boolean {
    return this.cardForm.get('general').value.position === PersonPosition.GOALKEEPER;
  }

  cardIsReferee(): boolean {
    return this.cardForm.get('general').value.position === PersonPosition.REFEREE;
  }

  private clearSkillsInFormExcept(attrsExceptions: string[]) {
    for (const attributesGroup of this.generateArray(this.cardForm.controls)) {
      for (const attribute of this.generateArray(this.cardForm.get(attributesGroup).value)){
        if (!attrsExceptions.includes(attribute) &&
          this.cardForm.get(attributesGroup).get(attribute).value !== null) {
          this.cardForm.get(attributesGroup).get(attribute).reset();
        }
      }
    }
  }

  private generateArray(obj){
    return Object.keys(obj);
  }
}

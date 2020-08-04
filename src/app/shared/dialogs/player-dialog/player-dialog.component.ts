import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Player} from "../../../entities/player/player";
import {Countries} from "../../enums/countries";

@Component({
  selector: 'player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.css']
})

export class PlayerDialogComponent {

  public action;
  public player: Player;
  public countries = Countries.all;

  constructor(private dialogRef: MatDialogRef<PlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.player = data.player;
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  doAction(){
    this.dialogRef.close({event: this.action, player: this.player});
  }

  handlePositionChange() {
    this.player.clearPlayerSkills();
  }
}

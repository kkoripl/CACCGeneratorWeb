import {Player} from "./player";

export class Goalkeeper extends Player {
  saving: number
  aerialAbility: number
  pace: number
  dribbling: number
  resilience: number

  constructor(name: string, country: string, saving: number, aerialAbility: number, pace: number,
              dribbling: number, resilience: number) {

    super(name, country);
    this.saving = saving;
    this.aerialAbility = aerialAbility;
    this.pace = pace;
    this.dribbling = dribbling;
    this.resilience = resilience;
  }
}

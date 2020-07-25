import {Player} from "./player";

export class Outfielder extends Player {
  pace: number
  dribbling: number
  heading: number
  highPass: number
  resilience: number
  shooting: number
  tackling: number

  constructor(name: string, country: string, pace: number, dribbling: number, heading: number,
              highPass: number, resilience: number, shooting: number, tackling: number) {
    super(name, country);
    this.pace = pace;
    this.dribbling = dribbling;
    this.heading = heading;
    this.highPass = highPass;
    this.resilience = resilience;
    this.shooting = shooting;
    this.tackling = tackling;
  }
}

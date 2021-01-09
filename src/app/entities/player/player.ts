import {Country} from "../../shared/enums/country";
import {PlayerPosition} from "../../shared/enums/player-position";

export class Player {
  name: string
  country: Country;

  position: PlayerPosition;

  pace: number
  dribbling: number
  heading: number
  highPass: number
  resilience: number
  shooting: number
  tackling: number

  saving: number
  aerialAbility: number
  handling: number

  constructor(name: string, country: Country, position: PlayerPosition, pace: number, dribbling: number, heading: number,
              highPass: number, resilience: number, shooting: number, tackling: number, saving: number, aerialAbility: number, handling: number) {
    this.name = name;
    this.country = country;
    this.pace = pace;
    this.dribbling = dribbling;
    this.heading = heading;
    this.highPass = highPass;
    this.resilience = resilience;
    this.shooting = shooting;
    this.tackling = tackling;
    this.saving = saving;
    this.aerialAbility = aerialAbility;
    this.handling = handling;
    this.position = position;
  }

  updatePlayer(player) {
    this.name = player.general.name;
    this.country = player.general.country;
    this.pace = player.general.pace;
    this.dribbling = player.general.dribbling;
    this.heading = player.outfielder.heading;
    this.highPass = player.general.highPass;
    this.resilience = player.general.resilience;
    this.shooting = player.outfielder.shooting;
    this.tackling = player.outfielder.tackling;
    this.saving = player.goalkeeper.saving;
    this.aerialAbility = player.goalkeeper.aerialAbility;
    this.handling = player.goalkeeper.handling;
    this.position = player.general.position;
  }

  isGoalkeeper(): boolean {
    return this.position === PlayerPosition.GOALKEEPER.valueOf();
  }

  clearPlayerSkills() {
    this.pace = undefined;
    this.dribbling = undefined;
    this.heading = undefined;
    this.highPass = undefined;
    this.resilience = undefined;
    this.shooting = undefined;
    this.tackling = undefined;
    this.saving = undefined;
    this.aerialAbility = undefined;
    this.handling = undefined;
  }

  getOutfielderSkills(): number[] {
    return [
      this.pace,
      this.dribbling,
      this.heading,
      this.highPass,
      this.resilience,
      this.shooting,
      this.tackling
    ];
  }

  getGoalkeeperSkills(): number[] {
    return [
      this.aerialAbility,
      this.dribbling,
      this.pace,
      this.resilience,
      this.saving,
      this.handling,
      this.highPass
    ];
  }
}

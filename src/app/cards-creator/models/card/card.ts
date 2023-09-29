import {Country} from "../../../common/enums/country";
import {PersonPosition as PersonPosition} from "../../enums/card/person-position";

export class Card {
  name: string
  country: Country;
  position: PersonPosition;
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
  leniency: number

  constructor(name: string, country: Country, position: PersonPosition, pace: number, dribbling: number, heading: number,
              highPass: number, resilience: number, shooting: number, tackling: number, saving: number, aerialAbility: number,
              handling: number, leniency: number) {
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
    this.leniency = leniency;
  }

  updateCard(card) {
    this.name = card.general.name;
    this.country = card.general.country;
    this.pace = card.general.pace;
    this.dribbling = card.general.dribbling;
    this.heading = card.outfielder.heading;
    this.highPass = card.general.highPass;
    this.resilience = card.general.resilience;
    this.shooting = card.outfielder.shooting;
    this.tackling = card.outfielder.tackling;
    this.saving = card.goalkeeper.saving;
    this.aerialAbility = card.goalkeeper.aerialAbility;
    this.handling = card.goalkeeper.handling;
    this.position = card.general.position;
    this.leniency = card.referee.leniency;
  }

  isGoalkeeper(): boolean {
    return this.position === PersonPosition.GOALKEEPER.valueOf();
  }

  isOutfielder(): boolean {
    return this.position === PersonPosition.OUTFIELDER.valueOf();
  }

  isReferee(): boolean {
    return this.position === PersonPosition.REFEREE.valueOf();
  }

  clearCardSkills() {
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
    this.leniency = undefined;
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

  getRefereeSkills(): number[] {
    return [
      this.leniency
    ];
  }
}

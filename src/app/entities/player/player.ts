import {Country} from "../../shared/enums/country";
import {Countries} from "../../shared/enums/countries";

export class Player {
  name: string
  country: Country;

  pace: number
  dribbling: number
  heading: number
  highPass: number
  resilience: number
  shooting: number
  tackling: number

  saving: number
  aerialAbility: number

  // constructor(name: string, playerCountry: string) {
  //   this.name = name;
  //   this.country = Countries.getCountryByAlpha3Code(playerCountry);
  // }

  constructor(name: string, country: string, pace: number, dribbling: number, heading: number,
              highPass: number, resilience: number, shooting: number, tackling: number, saving: number, aerialAbility: number) {
    this.name = name;
    this.country = Countries.getCountryByAlpha3Code(country);
    this.pace = pace;
    this.dribbling = dribbling;
    this.heading = heading;
    this.highPass = highPass;
    this.resilience = resilience;
    this.shooting = shooting;
    this.tackling = tackling;
    this.saving = saving;
    this.aerialAbility = aerialAbility;
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
      this.saving
    ];
  }
}

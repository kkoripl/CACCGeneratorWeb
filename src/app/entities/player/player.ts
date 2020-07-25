import {Country} from "../../shared/enums/country";
import {Countries} from "../../shared/enums/countries";

export class Player {
  name: string
  country: Country;

  constructor(name: string, playerCountry: string) {
    this.name = name;
    this.country = Countries.all.find(country => country.alpha3code === playerCountry);
  }
}

import {Match} from "../match/match";

export class Team {
  name: string
  logo?: File
  country: string

  constructor(name) {
    this.name = name;
  }

}

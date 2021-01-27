import {Pipe, PipeTransform} from "@angular/core";
import {Country} from "../../common/enums/country";

@Pipe({
  name: 'filterCountry'
})
export class FilterCountryPipe implements PipeTransform {
  transform(countries: Country[], searchText: string): any {
    if (searchText == null || countries == null) {
      return countries;
    } else {
      return countries.filter(country => country.name.toLowerCase().startsWith(searchText.toLowerCase()));
    }
  }
}

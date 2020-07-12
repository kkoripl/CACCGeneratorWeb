import { Component, TRANSLATIONS } from '@angular/core';
// import { TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cacc-web-frontend';

  // constructor(
  //   public translate: TranslateService
  // ) {
  //   translate.addLangs(['en']);
  //   translate.setDefaultLang('en');
  // }
  //
  // switchLang(lang: string) {
  //   this.translate.use(lang);
  // }
}

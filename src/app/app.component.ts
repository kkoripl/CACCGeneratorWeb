import {Component} from '@angular/core';
import {PathsGeneratorService} from "./shared/paths-generator/paths-generator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cacc-web-frontend';

  getCaLogoPath(): string {
    return PathsGeneratorService.getCaLogoPath();
  }
}

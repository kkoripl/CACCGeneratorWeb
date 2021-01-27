import {Component, OnInit} from '@angular/core';
import {PathsGeneratorService} from "./cards-creator/services/paths-generator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cacc-web-frontend';
  caLogoPath: string;

  ngOnInit(): void {
    this.caLogoPath = this.getCaLogoPath();
  }

  private getCaLogoPath(): string {
    return PathsGeneratorService.getCaLogoPath();
  }
}

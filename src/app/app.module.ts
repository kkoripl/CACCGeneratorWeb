import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {AppRoutes} from './app.routes';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GeneralErrorHandler} from "./common/error/error-handler/general-error-handler";
import {ToastrModule} from "ngx-toastr";
import {CardsCreatorModule} from "./cards-creator/cards-creator.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SeasonToolsModule} from "./season-tools/season-tools.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CardsCreatorModule,
    SeasonToolsModule,

    BrowserModule,
    AppRoutes,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [{
      provide: ErrorHandler, useClass: GeneralErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

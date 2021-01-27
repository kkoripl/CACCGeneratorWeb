import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {GeneralErrorHandler} from "../../common/error/error-handler/general-error-handler";
import {LeagueTableRoutes} from "./league-table.routes";
import {LeagueTableComponent} from "./league-table.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    LeagueTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,

    LeagueTableRoutes,
    MatTableModule,
    MatButtonModule
  ],
  providers: [{
    provide: ErrorHandler, useClass: GeneralErrorHandler
  }],
  bootstrap: []
})
export class LeagueTableModule { }

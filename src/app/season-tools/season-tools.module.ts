import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeagueTableModule} from "./league-table/league-table.module";
import {SeasonToolsRoutes} from "./season-tools.routes";


@NgModule({
  declarations: [],
  imports: [
    LeagueTableModule,
    SeasonToolsRoutes,

    CommonModule
  ]
})
export class SeasonToolsModule { }

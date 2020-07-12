import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XlsReaderComponent } from "./shared/file-reader/xls-file-reader/xls-reader.component";
import {MatchFileReaderComponent} from "./shared/file-reader/match-file-reader/match-file-reader.component";
import {LeagueTableComponent} from "./league-table/league-table.component";

const routes: Routes = [
  {
    path: 'xls-reader', component: XlsReaderComponent
  },
  {
    path: 'match-file-reader', component: LeagueTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

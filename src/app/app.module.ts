import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";

import { XlsReaderComponent } from './shared/file-reader/xls-file-reader/xls-reader.component';
import { MatchFileReaderComponent } from './shared/file-reader/match-file-reader/match-file-reader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { LeagueTableComponent } from './league-table/league-table.component';
import { CardsCreatorComponent } from './cards-creator/cards-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    XlsReaderComponent,
    MatchFileReaderComponent,
    LeagueTableComponent,
    CardsCreatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

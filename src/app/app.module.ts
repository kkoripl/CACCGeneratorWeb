import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {LeagueTableComponent} from './league-table/league-table.component';
import {CardsCreatorComponent} from './cards-creator/cards-creator.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlayerDialogComponent} from "./shared/dialogs/player-dialog/player-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {UploadPlayersDialogComponent} from "./shared/dialogs/upload-players-dialog/upload-players-dialog.component";
import {MatMenuModule} from "@angular/material/menu";
import {GeneralErrorHandler} from "./shared/error/error-handler/general-error-handler";
import {ToastrModule} from "ngx-toastr";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {OrderByPipe} from "./shared/pipes/order-by.pipe";
import {FilterCountryPipe} from "./shared/pipes/filter-country.pipe";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    AppComponent,
    LeagueTableComponent,
    CardsCreatorComponent,
    PlayerDialogComponent,
    UploadPlayersDialogComponent,
    OrderByPipe,
    FilterCountryPipe
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
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatMenuModule,
    ToastrModule.forRoot(),
    MatListModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  providers: [{
      provide: ErrorHandler, useClass: GeneralErrorHandler
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

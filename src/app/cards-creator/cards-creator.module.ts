import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";

import {HttpClientModule} from "@angular/common/http";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatMenuModule} from "@angular/material/menu";
import {ToastrModule} from "ngx-toastr";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {PlayerDialogComponent} from "./dialogs/new-player/player-dialog.component";
import {UploadPlayersDialogComponent} from "./dialogs/upload-players/upload-players-dialog.component";
import {FilterCountryPipe} from "./pipes/filter-country.pipe";
import {OrderByPipe} from "../common/pipes/order-by.pipe";
import {GeneralErrorHandler} from "../common/error/error-handler/general-error-handler";
import {CardsCreatorComponent} from "./cards-creator.component";

@NgModule({
  declarations: [
    CardsCreatorComponent,
    PlayerDialogComponent,
    UploadPlayersDialogComponent,
    OrderByPipe,
    FilterCountryPipe
  ],
  imports: [
    BrowserModule,
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
  bootstrap: []
})
export class CardsCreatorModule { }

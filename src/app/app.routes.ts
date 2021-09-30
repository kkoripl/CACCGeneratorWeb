import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardsCreatorComponent} from "./cards-creator/cards-creator.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'custom-cards', pathMatch: 'full'
  },
  {
    path: 'custom-cards', component: CardsCreatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CardsCreatorComponent} from "./cards-creator.component";

const routes: Routes = [
  {
    path: 'custom-cards', component: CardsCreatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CardsCreatorRoutes { }

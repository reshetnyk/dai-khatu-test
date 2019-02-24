import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RentCreationComponent} from './rent-creation.component';

const rentCreationRoutes: Routes = [
  {
    path: '', component: RentCreationComponent
  },
  {

    path: '**', component: RentCreationComponent
  }];

@NgModule({
  imports: [
    RouterModule.forChild(rentCreationRoutes)
  ],
  exports: [RouterModule]
})
export class RentCreationRoutingModule {

}

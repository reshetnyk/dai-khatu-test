import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RentCreationComponent} from './rent-creation.component';
import {Step1Component} from './step1/step1.component';
import {Step2Component} from './step2/step2.component';

const rentCreationRoutes: Routes = [
  {
    path: '', component: RentCreationComponent
  },
  {
    path: 'step1', component: Step1Component
  },
  {
    path: 'step2', component: Step2Component
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

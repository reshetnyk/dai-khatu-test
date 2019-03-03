import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RentFormComponent} from './rent-form/rent-form.component';

const rentCreationRoutes: Routes = [
  {
    path: '', component: RentFormComponent
  },
  {
    path: 'room', component: RentFormComponent
  },
  {
    path: 'guests-and-beds', component: RentFormComponent
  },
  {
    path: 'household-appliances', component: RentFormComponent
  },
  {
    path: 'bathroom', component: RentFormComponent
  },
  {
    path: 'facilities', component: RentFormComponent
  },
  {
    path: 'limits', component: RentFormComponent
  },
  {
    path: 'location', component: RentFormComponent
  },
  {
    path: 'map', component: RentFormComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rentCreationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BecomeAHostRoutingModule { }

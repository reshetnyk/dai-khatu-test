import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { GuestsAndBedsComponent } from './guests-and-beds/guests-and-beds.component';
import { BathroomComponent } from './bathroom/bathroom.component';
import { HouseholdAppliancesComponent } from './household-appliances/household-appliances.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { LimitsComponent } from './limits/limits.component';
import { TabsComponent } from './layout/tabs/tabs.component';
import {BecomeAHostRoutingModule} from './become-a-host-routing.module';
import { BecomeAHostComponent } from './become-a-host.component';
import { LocationComponent } from './location/location.component';
import { MapComponent } from './map/map.component';
import {ActionButtonsComponent} from './layout/action-buttons/action-buttons.component';
import { RentFormComponent } from './rent-form/rent-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StepIncBtnModule} from '../common/step-inc-btn/step-inc-btn.module';
import {MatAutocompleteModule, MatInputModule, MatSelectModule} from '@angular/material';
import { ProgressComponent } from './layout/progress/progress.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageNotFound2Component } from './page-not-found2/page-not-found2.component';

@NgModule({
  declarations: [
    BecomeAHostComponent,
    RoomComponent,
    GuestsAndBedsComponent,
    BathroomComponent,
    HouseholdAppliancesComponent,
    FacilitiesComponent,
    LimitsComponent,
    TabsComponent,
    ActionButtonsComponent,
    LocationComponent,
    MapComponent,
    RentFormComponent,
    ProgressComponent,
    PageNotFoundComponent,
    PageNotFound2Component

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    BecomeAHostRoutingModule,
    StepIncBtnModule
  ]
})
export class BecomeAHostModule { }

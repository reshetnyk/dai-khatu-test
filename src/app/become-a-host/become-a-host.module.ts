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
import {ReactiveFormsModule} from '@angular/forms';
import {StepIncBtnModule} from '../common/step-inc-btn/step-inc-btn.module';

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
    RentFormComponent

  ],
  imports: [
    StepIncBtnModule,
    CommonModule,
    BecomeAHostRoutingModule,
    ReactiveFormsModule
  ]
})
export class BecomeAHostModule { }

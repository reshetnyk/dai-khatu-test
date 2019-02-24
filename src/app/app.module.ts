import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {RentCreationModule} from './rent-creation/rent-creation.module';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {HomeModule} from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

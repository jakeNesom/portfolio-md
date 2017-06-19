//Modules
import { HttpModule } from '@angular/http';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// angular google maps wrappers
import { AgmCoreModule } from 'angular2-google-maps/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

//Services
import { PupperData } from './services/pupper-data.service';
import { AddressManip } from './services/address-manip.service';

//Components
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpModule, 
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBBFBXvWY8TRmYoJHs1kk0b_2yKFJtJI9Y'
    })
                   ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ GoogleMapsAPIWrapper, PupperData, AddressManip ]
})
export class AppModule { }

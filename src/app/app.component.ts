import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { PupperData } from './services/pupper-data.service';
import { AddressManip } from './services/address-manip.service';

import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { gmapStyle } from '../assets/gmap-style';

// https://stackoverflow.com/questions/37326572/how-can-i-integrate-google-maps-apis-inside-an-angular-2-component
declare var google: any;
interface Window {
  initMap():void;
}

@Component({
  selector: 'app-root',
  templateUrl: 'views/app.component.html',
  styleUrls: [ 'css/app.component.css'],
  animations: [
    trigger('iconEnter', [
      state('false', style({transform: 'translate(-100%, 0)', 
       opacity:0
    
  })),
    state('true', style({ transform: 'translate(0,0)', opacity:1 })),
    transition('false => true ', [
      animate('500ms ease-out', keyframes([
        style({
          transform: 'translate(-500%,0)', 
          opacity:0,
          offset:0
        }),
        style({
          transform: 'translate(-20px,0)', 
          opacity:1,
          offset:.3
        })
      ]) 
      )
    ]),
    
  ])
]
})
export class AppComponent  { 
  public setup = {
    "color": {
      "primary":"#00b0ff",
      "light":"#69e2ff",
      "dark": "##0081cb"
    }
  }

  public skills = [
    { 
      "name": "Angular",
      "value":"90",
      "bufferVal":"100",
      "color":"primary",
      "mode":"mode"
    },
    { 
      "name": "Javascript",
      "value":"90",
      "bufferVal":"100",
      "color":"primary",
      "mode":"mode"
    },
    { 
      "name": "Bootstrap",
      "value":"90",
      "bufferVal":"100",
      "color":"primary",
      "mode":"mode"
    },
    { 
      "name": "HTML",
      "value":"90",
      "bufferVal":"100",
      "color":"primary",
      "mode":"mode"
    },
    { 
      "name": "CSS",
      "value":"90",
      "bufferVal":"100",
      "color":"primary",
      "mode":"mode"
    },
    { 
      "name": "NodeJS",
      "value":"60",
      "bufferVal":"100",
      "color":"primary",
      "mode":"mode"
    },
    { 
      "name": "ExpressJS",
      "value":"60",
      "bufferVal":"100",
      "color":"primary",
      "mode":"mode"
    },
    { 
      "name": "MongoDB",
      "value":"50",
      "bufferVal":"100",
      "color":"primary",
      "mode":"mode"
    },
  ];

  public initialLoad = 'false';
  options:any;
  styles:any;
  
  public animalData:any;

  public locArr = [];
  constructor( gmw:GoogleMapsAPIWrapper, public pupperData:PupperData,
    public addressManip:AddressManip) {
    
      console.log('gmapstyle: ' + gmapStyle);
      
    
}
  
  
  ngOnInit() { 
   
  //   var mapProp = {
  //           center: new google.maps.LatLng(51.508742, -0.120850),
  //           zoom: 5,
  //           mapTypeId: google.maps.MapTypeId.ROADMAP
  //       };
  //     var map = new google.maps.Map(document.getElementById("gmap"), mapProp);
    let _this = this;
    
    setTimeout( function() {

      _this.toggleTransition();
     

    }, 3000);
    
        
  }

  getPupperData () {
    this.pupperData.getAllPupperData()
      .then(data => this.processData(data) );
  }

  processData(data:any) {
    console.dir(data); 
    this.animalData = data.features;
    this.animalData = this.animalData.splice(-50);
    console.dir(this.animalData);
    this.testGeoLocation(this.animalData);
  }

  testGeoLocation (data) {
    for(let i = 0; i < data.length; i++ )
    {
      
      let item = data[i].properties;
      let loc = this.addressManip.convertAddressToSearchString(item.Picked_up_Location);
      
      if(loc === 'na') { continue; } // skip items without addresses
      else {
        this.addressManip.getAddressAsGeoCode(loc)
          .then(response => this.updateLocArray(item, response) );
      }
    }

    
  }

  updateLocArray (item: object, resp) {
    if(resp.results["0"] === undefined ) return;
   let lat = resp.results["0"].geometry.location.lat;
   let lng = resp.results["0"].geometry.location.lng;
    console.log(resp);
   console.log(lat + ' ' + lng);
   item['loc'] = { 'lat': lat, 'lng': lng };
 
   this.locArr.push(item)
  }

  clickedMarker(label?, arrIndex?) {

    console.log('marker clicked');
  }

  toggleTransition() {
    console.log(this.initialLoad);
    this.initialLoad = (this.initialLoad === 'false' ? 'true' : 'false');

  }
  
}

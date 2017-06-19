import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

interface Date {
    toMysqlFormat();
}

@Injectable ()
export class AddressManip {

    private ADDRESSURL:string = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    private APIKEY:string = 'AIzaSyBBFBXvWY8TRmYoJHs1kk0b_2yKFJtJI9Y';
    private filterObj = {
        startTime: "",
        stopTime: ""
    }
    constructor(private http: Http) {}

    getAddressAsGeoCode(searchStr:string): Promise <any> { 

        return this.http.get(this.ADDRESSURL + "?" + searchStr + this.APIKEY)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    private handleError(error:any): Promise <any> {
        console.error('An error occoured in pupper-data.service ', error);
        return Promise.reject(error.message || error );
    }


    public convertAddressToSearchString ( addy:string )
    {
        // remove 'BLK' from string'
        if(!addy || addy.indexOf('ADA') !== -1 )
        {
            console.log('address is blank or contains ADA.  Submitted Address: \n' + addy);
            return 'na';
        }
        let addyArr = [];
        let blkIndx = addy.indexOf('BLK');
        let searchStr = '';
        if ( blkIndx !== -1 ) {
            addy = addy.slice(blkIndx, blkIndx + 4);
        }
        // break string into array using ' ' as delimiter
        addyArr = addy.split( ' ' );
        
        // concat array items with '+' delimeter
        for(let i = 0; i < addyArr.length; i++ )
        {   
            if ( i === 0 ) { searchStr += addyArr[i];}
            else { searchStr += '+' + addyArr[i]; }
        }
        // concat above string with string ',+Sacramento,+CA&key="API_KEY"
        searchStr += ',+SACRAMENTO,+CA&KEY=';
        
        console.log(searchStr);
        return searchStr;
    }


}
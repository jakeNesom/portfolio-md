import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

interface Date {
    toMysqlFormat();
}

@Injectable ()
export class PupperData {
    private pupperDataUrl = 'https://opendata.arcgis.com/datasets/3f6982695aca45af9fe48fcd59360219_0.geojson';

    private filterObj = {
        startTime: "",
        stopTime: ""
    }
    constructor(private http: Http) {}

    getAllPupperData(): Promise <any> { 

        return this.http.get(this.pupperDataUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    private handleError(error:any): Promise <any> {
        console.error('An error occoured in pupper-data.service ', error);
        return Promise.reject(error.message || error );
    }


// convert javascript date to SQL date format with following 2 functions
// this is for reducing technical debt and scalability
// https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime


private twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

public toMysqlFormat (dateString:string) {
    let date;
    if(dateString) {  date = new Date(dateString); }
    else { date = new Date();}
    
    return date.getUTCFullYear() + "-" + this.twoDigits(1 + date.getUTCMonth()) 
        + "-" + this.twoDigits(date.getUTCDate()) 
        + " " + this.twoDigits(date.getUTCHours()) 
        + ":" + this.twoDigits(date.getUTCMinutes()) 
        + ":" + this.twoDigits(date.getUTCSeconds());
};

}
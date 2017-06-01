import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class ConnectionData {
  online: boolean;
  connectedRef : any;


  /**
    Class for the connection provider.
  */
  constructor(public http: Http) {}


  /**
    [isOnline description]
    return online variable
  */
  isOnline(): Observable<any>  {

    // check if we can connected to firebase
    return Observable.create(observer => {
      var connectedRef = firebase.database().ref(".info/connected");

      // fire event every time that lost connection
      let listener = connectedRef.on('value', connectionSnap => {
        console.log(connectionSnap.val());
        observer.next(connectionSnap.val());
      }, observer.error );

      return () => {
        connectedRef.off('value', listener);
      };
    })
  }
}

import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class BoxesData {
  boxesRef: any;

  /**
    constructor
  */
  constructor( public http: Http,
               public ngZone: NgZone) {
    
    this.boxesRef = firebase.database().ref('/boxes');
  }

  /**
    [boxes description]
    Get all boxes in the firebase database using observer
    to detect when element has been added or modified.
  */
  boxes(): Observable<any> {
    return Observable.create( observer => {
      let listener = this.boxesRef.on('child_added', snapshot => {

        let data = snapshot.val();
        data.id = snapshot.key;
        observer.next(data);

      }, observer.error);

      return () => {
        this.boxesRef.off('child_added', listener);
      };
    });
  }
}

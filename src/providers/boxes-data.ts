import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StorageData } from './storage-data';
import firebase from 'firebase';

@Injectable()
export class BoxesData {
  boxesRef: any;

  /**
    constructor
  */
  constructor( public http: Http,
               public ngZone: NgZone, 
               public storageData: StorageData ) {

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

  /**
   * get all details of the box and image
   * and download image to local storage
   * @param id
   */
  box( id: string ) : any {
    return Observable.create(observer => {
      let listener = this.boxesRef.child(id).on('value', snapshot => {

        // save box general data
        let boxData = snapshot.val();

        // get url download image using observable element
        this.storageData.download(boxData.image_b, id).then(url => {
          boxData.imageBoxB = url;
          observer.next(boxData);
        });
      }, observer.error);
      return () => {
        this.boxesRef.off('value', listener);
      };
    });
  }
}

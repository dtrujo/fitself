import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Transfer } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

// Cordova
declare var cordova: any;


@Injectable()
export class StorageData {

  storageRef: any;

  /**
  *
  */
  constructor(public http: Http) {
    this.storageRef = firebase.storage().ref('profile');
  }

  /**
    [exercises description]
    Get all exercises in the firebase database using observer
    to detect when element has been added or modified.
    @param  {string} src [image name]
  */
  image( src: string ): Observable<any> {
    return Observable.create(observer => {

      // Get the download URL for 'profiles folder'
      // This can be inserted into an <img> tag
      // This can also be downloaded directly
      this.storageRef.child( src ).getDownloadURL().then(function(url) {



        // Create instance:
        /*const fileTransfer = new Transfer();
        let urluri = url;
        fileTransfer.download(urluri, cordova.file.dataDirectory + 'pepe.jpg').then((entry) => {
          console.log('download complete: ' + entry.toURL());
        }, (error) => {
          console.log(error);
        });*/






        observer.next(url);

      }).catch(function(error) {
        observer.next(error);

      });

      // Any cleanup logic might go here
      return () => console.log('disposed')
    });
  }
}

import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthData } from './auth-data';
import firebase from 'firebase';

@Injectable()
export class FriendsData {
  fireAuth : any;
  userProfile : any;
  friendsRef: any;

  /**
    constructor
  */
  constructor( public http: Http,
               public ngZone: NgZone,
               public authData: AuthData ) {

    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/users');
  }

  /**
    [friends description]
    Get all friends in the firebase database using observer
    to detect when element has been added or modified.
  */
  friends(): Observable<any> {
    return Observable.create( observer => {

      var userId = this.fireAuth.currentUser.uid;
      this.friendsRef = this.userProfile.child(userId + '/friends');

      let listener = this.friendsRef.on('child_added', snapshot => {

        // get friend information
        this.authData.user( snapshot.key ).subscribe(data => {

          // pass value to the observer
          observer.next(data);

        });
      }, observer.error);

      return () => {
        this.friendsRef.off('child_added', listener);
      };
    });
  }
}

import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';
import { StorageData } from '../../providers/storage-data';
import firebase from 'firebase';

/**
  Class for the HomePage page.
*/
@Component({
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  image : any;
  fireAuth : any;
  currentUser : any;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public ngZone: NgZone,
               public storageData: StorageData,
               public authData: AuthData) {

     this.currentUser = '';
  }

  /**
    [ngOnInit description]
    This event fire any time when user access to the view
  */
  ngOnInit() {

    // create component to detect is user is loggin or not
    firebase.auth().onAuthStateChanged((user) => {
      this.ngZone.run(() => {

        if (user) {
          this.authData.user(user.uid).subscribe(data => {

            this.ngZone.run(() => {
              this.currentUser = data;
            });

          });
        } else {
          this.currentUser = '';
        }

      });
    });
  }

  /**
    [ngOnDestroy description]
    This event fire any time when user turn down the view
  */
  ngOnDestroy(){
    this.currentUser = '';
  }

  /**
    [logOut description]
  */
  logOut(){
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}

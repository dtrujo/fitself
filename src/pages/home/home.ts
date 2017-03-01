import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';
import { StorageData } from '../../providers/storage-data';
import firebase from 'firebase';

/**
  Class for the HomePage page.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  image : any;
  fireAuth : any;
  currentUser : any;
  friendsCount : number;
  exercisesCount: number;

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
    [ionViewDidEnter description]
    Change statusbar when enter into view
  */
  ionViewDidLoad() {}

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
              this.friendsCount = Object.keys(this.currentUser.friends).length;
              this.exercisesCount = Object.keys(this.currentUser.exercises).length;
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

  /**
    [goToFriends description]
  */
  goToFriends(){
    this.navCtrl.parent.select(1);
  }

  /**
    [goToExercises description]
  */
  goToExercises(){
    this.navCtrl.parent.select(2);
  }

  /**
    [goToNotebook description]
  */
  goToNotebook(){
    this.navCtrl.parent.select(3);
  }

}

import { Component, NgZone } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen, Network } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { DashBoardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { ConnectionData } from '../providers/connection-data';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  subscription: any;

  /**
    Constructor
  */
  constructor(
    platform: Platform,
    public connectionData: ConnectionData,
    public toastCtrl: ToastController,
    public ngZone: NgZone) {

    // firebase object
    var config = {
      apiKey: "AIzaSyC3T30cujg9cW3WENjIaY3hE6fALKorCuw",
      authDomain: "wodapp-d6da4.firebaseapp.com",
      databaseURL: "https://wodapp-d6da4.firebaseio.com",
      storageBucket: "wodapp-d6da4.appspot.com",
    };

    // initialize firebase
    firebase.initializeApp(config);

    // watch network for a disconnect
    Network.onDisconnect().subscribe(() => {
      this.presentToast();
    });

    // watch network for a connection
    Network.onConnect().subscribe(() => {
      console.log('network connected!'); 
    });

    // the platform is completely ready
    platform.ready().then(() => {

      // hide manually the splash screen
      Splashscreen.hide();

      // create component to detect is user is loggin or not
      firebase.auth().onAuthStateChanged((user) => {
        this.ngZone.run(() => {
          user ? this.rootPage = DashBoardPage : this.rootPage = LoginPage;
        });
      });
    });
  }


  /**
    [presentToast description]
    Show toast information when the user
    has not connection or work in offline mode
  */
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Not network connection',
      duration: 3000
    });
    toast.present();
  }
}

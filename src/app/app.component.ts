import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, public ngZone: NgZone,) {

    // firebase object
    var config = {
      apiKey: "AIzaSyC3T30cujg9cW3WENjIaY3hE6fALKorCuw",
      authDomain: "wodapp-d6da4.firebaseapp.com",
      databaseURL: "https://wodapp-d6da4.firebaseio.com",
      storageBucket: "wodapp-d6da4.appspot.com",
    };

    // initialize firebase
    firebase.initializeApp(config);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /*StatusBar.styleDefault();
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString('#1B5A68');*/

      // create component to detect is user is loggin or not
      firebase.auth().onAuthStateChanged((user) => {
        this.ngZone.run(() => {
          user ? this.rootPage = TabsPage : this.rootPage = LoginPage;
        });
      });

      Splashscreen.hide();
    });
  }
}

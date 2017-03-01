import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';
import firebase from 'firebase';

/*
  Generated class for the Test page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashBoardPage implements OnInit, OnDestroy {
  dashBoardPage: any;
  currentUser : any = "";

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public ngZone: NgZone,
               public authData: AuthData,
               public loadingCtrl: LoadingController,
               public navParams: NavParams) {

    // load tabs page by default in this sections
    this.dashBoardPage = TabsPage;
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

    // loading element hiden when the view change
    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });

    // present loading
    loading.present();

    // stop 2 sec showing load before to logout
    setTimeout(() => {
      this.authData.logoutUser().then(() => {
        this.navCtrl.setRoot(LoginPage);
      });
    }, 2000);
  }
}

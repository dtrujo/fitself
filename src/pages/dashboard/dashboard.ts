import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';

/*
  Generated class for the Test page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashBoardPage {
  dashBoardPage: any;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public authData: AuthData,
               public loadingCtrl: LoadingController,
               public navParams: NavParams) {

    // load tabs page by default in this sections
    this.dashBoardPage = TabsPage;
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

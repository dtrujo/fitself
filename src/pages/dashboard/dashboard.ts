import { User } from './../../models/user';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';
import { Storage } from '@ionic/storage';
import { ConnectionData } from '../../providers/connection-data';
import firebase from 'firebase';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashBoardPage implements OnInit, OnDestroy {
  dashBoardPage: any;
  user: User;
  isClassVisible: boolean;
  subscription: any;
  imageFlag: boolean;

  /**
   * 
   * @param navCtrl 
   * @param ngZone 
   * @param storage 
   * @param authData 
   * @param connectionData 
   * @param loadingCtrl 
   * @param navParams 
   */
  constructor( public navCtrl: NavController,
               public ngZone: NgZone,
               public storage: Storage,
               public authData: AuthData,
               public connectionData: ConnectionData,
               public loadingCtrl: LoadingController,
               public navParams: NavParams) {

    this.imageFlag = false;

    // create new user
    this.user = new User( 
      null, null, null, null,
      null, null, null, null,
      true, null, null, null, 
      null
    );

    // load tabs page by default in this sections
    this.dashBoardPage = TabsPage;

    // check connection subscription if the client
    // is online or offline
    this.subscription = this.connectionData.isOnline().subscribe( data => {
      this.ngZone.run(() => {
        this.isClassVisible = data;
      });
    });
  }

  /**
    [ngOnInit description]
    This event fire any time when user access to the view
  */
  ngOnInit() {
    this.ngZone.run(() => {
      
      // read user store in localStorage to improve
      // load information if user exist. If the user is
      // not in local storage, we will look for in firebase
      this.storage.get('user').then((dataUser) => {
        if(dataUser) {        
          this.user = JSON.parse(dataUser);         

          // control if the user has image 
          if (!this.user.imageSource)
            this.imageFlag = true;
        }
      });
            
    });
  }

  /**
    [ngOnDestroy description]
    This event fire any time when user turn down the view
  */
  ngOnDestroy(){
    this.subscription.unsubscribe();
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
        this.storage.clear();
        this.navCtrl.setRoot(LoginPage);
      });
    }, 2000);
  }
}

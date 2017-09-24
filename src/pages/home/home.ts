import { Config } from './../../models/config';
import { User } from './../../models/user';
import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from 'ionic-native';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
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
export class HomePage {
  fireAuth : any;
  user: User;
  config : Config;
  imageProfile : string;
  imageFlag: boolean;

  /**
   * 
   * @param navCtrl 
   * @param ngZone 
   * @param storage 
   * @param transfer 
   * @param file 
   * @param storageData 
   * @param authData 
   */
  constructor( public navCtrl: NavController,
               public ngZone: NgZone,
               public storage: Storage,
               private transfer: Transfer,
               private file: File,
               public storageData: StorageData,
               public authData: AuthData) {

    this.imageFlag = false;

    // create new user
    this.user = new User( 
      null, null, null, null,
      null, null, null, null,
      true, null, null, null, 
      null
    );

    // create new config
    this.config = new Config(0,0,0,'','');
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

      this.storage.get('config').then((dataConfig) => {
        if(dataConfig) this.config = JSON.parse(dataConfig);
      });
      
    });
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

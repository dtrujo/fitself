import { User } from './../../models/user';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from 'ionic-native';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';
import { StorageData } from '../../providers/storage-data';
import firebase from 'firebase';

// Cordova
declare var cordova: any;

/**
  Class for the HomePage page.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
  fireAuth : any;
  user: User;
  friends : number;
  exercises: number;
  trainings: number;
  imageProfile : string;
  box_image: any;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public ngZone: NgZone,
               public storage: Storage,
               private transfer: Transfer,
               private file: File,
               public storageData: StorageData,
               public authData: AuthData) {
    
    // create new user
    this.user = new User( 
      null, null, null, null,
      null, null, null, null,
      true, null, null, null, 
      null
    );

    // init values
    this.friends = 0;
    this.exercises = 0;
    this.trainings = 0;
    this.box_image = '';
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
    this.ngZone.run(() => {
      
      // read user store in localStorage to improve
      // load information if user exist. If the user is
      // not in local storage, we will look for in firebase
      this.storage.get('user').then((dataUser) => {
        if(dataUser) this.user = JSON.parse(dataUser);
      });
      this.storage.get('friends').then((dataFriends) => {
        if(dataFriends) this.friends = dataFriends;
      });
      this.storage.get('exercises').then((dataExercises) => {
        if(dataExercises) this.exercises = dataExercises;
      });
      this.storage.get('trainings').then((dataTrainings) => {
        if(dataTrainings) this.trainings = dataTrainings;
      });
      this.storage.get('box').then((dataBox) => {
        if(dataBox) this.box_image = dataBox;
      });

    });

    /*
    // create component to detect is user is loggin or not
    firebase.auth().onAuthStateChanged((user) => {
      this.ngZone.run(() => {

        console.log("init");
        console.log(user);

        // current user
        if (user) {
          this.authData.user(user.uid).subscribe(data => {
            this.ngZone.run(() => {

              // user storage
              this.storage.get('user').then((val) => {

                // if the lastModified timestamp is diferent to the
                // user storage, meaning we need to update user information
                // saved in the local storage
                if( data.lastModified != this.currentUser.lastModified){

                  // create file to transfer picture
                  // from firebase to local storage
                  const fileTransfer: TransferObject = this.transfer.create();
                  let urluri = data.image;

                  // download picture
                  fileTransfer.download(urluri, this.file.dataDirectory + 'user.jpg').then((entry) => {

                    // update user information in the ui
                    this.updateCurrentUser(
                      data,
                      entry.toURL(),
                      Object.keys(data.friends).length,
                      Object.keys(data.exercises).length
                    );

                    // update user information in local storage
                    let userData = {
                      'user': data,
                      'img': entry.toURL(),
                      'friends' : this.friendsCount,
                      'pr': this.exercisesCount };

                    // save data into local storage
                    this.storage.set('user', JSON.stringify(userData));

                  }, (error) => {
                    console.log(error);
                  });
                }
              })
            });
          });

        } else {
          this.currentUser = '';
        }
      });
    });

    */
  }

  /**
    [downloadPictureProfile description]
    @param {string} url [firebase url user picture profile]
  */
  downloadPictureProfile(url: string){
    const fileTransfer: TransferObject = this.transfer.create();
    let urluri = url;

    fileTransfer.download(urluri, this.file.dataDirectory + 'user.jpg').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      return entry.toURL();
    }, (error) => {
      return error;
    });
  }

  /**
    [updateCurrentUser description]
    update user information in the ui
    @param {any} user           [current user information]
    @param {number} friends     [friend's user]
    @param {number} exercises   [exercises's user]
    @param {string} url         [user image profile]
  */
  updateCurrentUser(user: any, url: string, friends: number, exercises: number){

    // update user information in the ui
    //this.currentUser = user;
    //this.imageProfile = url;
    //this.friendsCount = friends;
    //this.exercisesCount = exercises;
  }

  /**
    [ngOnDestroy description]
    This event fire any time when user turn down the view
  */
  ngOnDestroy(){
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

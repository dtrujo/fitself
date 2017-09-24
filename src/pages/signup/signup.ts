import { User } from './../../models/user';
import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { Camera, Crop } from '@ionic-native';

import { HomePage } from '../home/home';
import { PicturePage } from '../picture/picture';
import { Signup2Page } from '../signup2/signup2';
import { AuthData } from '../../providers/auth-data';
import { MediaData } from '../../providers/media-data';

/**
  Generated class for the SignupPage page.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: any;
  imageSource: any;

  /**
   * Patterns to validator
   */
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public formBuilder: FormBuilder,
               public ngZone: NgZone,
               public authData: AuthData,
               public mediaData: MediaData,
               public actionSheetCtrl: ActionSheetController,
               public loadingCtrl: LoadingController,
               public alertCtrl: AlertController ) {

    // inizialization
    this.imageSource = '';

    // validate form
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    })
  }

  /**
    [goToNextStep description]
    Go to the second part of the user details
    if all fields are completed
  */
  goToNextStep() {

    // if the form is validated
    if (this.signupForm.valid){

      // create new user
      var user = new User(
        null, 
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.username,
        this.signupForm.value.surname,
        null,null,true,null,null, null, 
        this.imageSource
      );

      // pass user to second step 
      this.navCtrl.push(Signup2Page, {user: user});
    }
  }

  /**
    [presentActionSheet description]
    Show options to select between take picture
    in the camera or select gallery pictures
  */
  presentActionSheet() {

    // constructor actionSheet
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Picture',
      buttons: [
        {
          text: 'Take picture',
          handler: () => {
            this.mediaData.getMedia(1).then((picture) => {
              this.imageSource = picture;
            });
          }
        },{
          text: 'Open Gallery',
          handler: () => {
            this.mediaData.getMedia(0).then((picture) => {
              this.imageSource = picture;
            });
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}

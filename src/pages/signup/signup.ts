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

    // validate form
    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    })
  }

  /**
    [goToNextStep description]
    Go to the second part of the user details
  */
  goToNextStep() {
    this.navCtrl.push( Signup2Page, { signupForm : this.signupForm } );
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
               this.ngZone.run(()=>{
                 console.log(picture);
                 this.imageSource = picture;
               })
            });
          }
        },{
          text: 'Open Gallery',
          handler: () => {
            this.mediaData.getMedia(2).then((picture) => {
               this.ngZone.run(()=>{
                 console.log(picture);
                 this.imageSource = picture;
               })
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

  /**
    [signupUser description]
  */
  signupUser(){
    this.navCtrl.push(Signup2Page);

    if (!this.signupForm.valid){
      console.log("no validdo");
      console.log(this.signupForm.value);
    } else {

      this.navCtrl.push(Signup2Page);

      /*this.authData.signupUser(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.username,
        this.signupForm.value.name,
        this.signupForm.value.surname).then(() => {
          this.navCtrl.setRoot(HomePage);
      }, (error) => {

        var errorMessage: string = error.message;
        let alert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [{
            text: "Ok",
            role: 'cancel'
          }]
        });

        alert.present();
      });

      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });

      loading.present();*/
    }
  }
}

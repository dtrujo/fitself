import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AuthData } from '../../providers/auth-data';

/**
  Generated class for the SignupPage page.
*/
@Component({
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm: any;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public formBuilder: FormBuilder,
               public authData: AuthData,
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
    [signupUser description]
  */
  signupUser(){

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(
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

      loading.present();
    }
  }
}

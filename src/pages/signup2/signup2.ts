import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AuthData } from '../../providers/auth-data';

/**
  Generated class for the SignupPage page.
*/
@Component({
  selector: 'page-signup-2',
  templateUrl: 'signup2.html'
})
export class Signup2Page {
  signup2Form: any;

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public formBuilder: FormBuilder,
               public authData: AuthData,
               public navParams: NavParams,
               public loadingCtrl: LoadingController,
               public alertCtrl: AlertController ) {


    console.log(navParams.get('signupForm').value);

    // validate form
    this.signup2Form = formBuilder.group({
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

    if (!this.signup2Form.valid){
      console.log(this.signup2Form.value);
    } else {
      this.authData.signupUser(
        '',
        this.signup2Form.value.password,
        this.signup2Form.value.username,
        this.signup2Form.value.name,
        this.signup2Form.value.surname).then(() => {
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

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ResetPasswordPage } from '../resetpassword/resetpassword';
import { AuthData } from '../../providers/auth-data';

/**
   Class for the LoginPage page.
*/
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: any;

  /**
    Contructor
  */
  constructor( private navCtrl: NavController,
               public formBuilder: FormBuilder,
               public loadingCtrl: LoadingController,
               public authData: AuthData,
               public alertCtrl: AlertController ) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  /**
    [loginUser description]
    control login user calling firebase API
  */
  loginUser(){

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( auth => {
        this.navCtrl.setRoot(TabsPage);
      }, error => {

        let alert = this.alertCtrl.create({
          message: error.message,
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

  /**
    [goToSignup description]
  */
  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  /**
    [goToResetPassword description]
  */
  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

}

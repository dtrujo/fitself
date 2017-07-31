import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { ResetPasswordPage } from '../resetpassword/resetpassword';
import { AuthData } from '../../providers/auth-data';

/**
   Class for the LoginPage page.
*/
@Component({
  selector: 'page-login',
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
    [ionViewDidEnter description]
    Change statusbar when enter into view
  */
  ionViewDidLoad() {}

  /**
    [loginUser description]
    control login user calling firebase API
  */
  loginUser(){

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {

      // login function to check authdata
      this.authData.loginUser(
        this.loginForm.value.email,
        this.loginForm.value.password)
      .then( auth => {

        console.log(auth.uid);

        // pass loading param to dismiss loading manually
        this.navCtrl.setRoot(TabsPage, { loading: loading });
      }, error => {

        // present alert to show message error
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{
              text: "Ok",
              role: 'cancel'
            }]

        });
        alert.present();
      });

      // loading view dont disable when the new page
      // is loading. I will dismiss manually loading when the
      // tabs view has been loaded
      let loading = this.loadingCtrl.create({
        dismissOnPageChange: false,
      });

      // present loading
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

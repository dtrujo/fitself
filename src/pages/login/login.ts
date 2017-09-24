import { Config } from './../../models/config';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { DashBoardPage } from '../dashboard/dashboard';
import { ResetPasswordPage } from '../resetpassword/resetpassword';
import { AuthData } from '../../providers/auth-data';
import { BoxesData } from '../../providers/boxes-data';
import { User } from "../../models/user";
import { Storage } from '@ionic/storage';
 
/**
   Class for the LoginPage page.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: User;
  config: Config;
  loginForm: any;

  /**
   * Patterns to validator
   */
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
    Contructor
  */
  constructor( private navCtrl: NavController,
               public formBuilder: FormBuilder,
               public loadingCtrl: LoadingController,
               public authData: AuthData,
               public boxesData: BoxesData,
               public storage: Storage,
               public alertCtrl: AlertController ) {
                 
    // create new user
    this.user = new User( 
      null, null, null, null,
      null, null, null, null,
      true, null, null, null, 
      null
    );

    // create new config
    this.config = new Config(0,0,0,'','');

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(this.emailPattern), Validators.required])],
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

      // login function to check authdata
      this.authData.loginUser(
        this.loginForm.value.email,
        this.loginForm.value.password)
      .then( auth => {

        this.authData.user(auth.uid).subscribe(data => {
          this.user = data;

          // the user has box
          if (this.user.box){

            // get box data if user has a box
            this.boxesData.box(this.user.box).subscribe(box => {
              this.config.imageBoxB = box.imageBoxB;

              this.storage.set('user', JSON.stringify(this.user));   
              this.storage.set('config', JSON.stringify(this.config)); 
              this.navCtrl.setRoot(DashBoardPage);
            });

          } else {

            // independent box
            this.config.imageBoxW = "assets/images/crossfitindependent_w.png";
            this.config.imageBoxB = "assets/images/crossfitindependent_b.png";

            this.storage.set('user', JSON.stringify(this.user));   
            this.storage.set('config', JSON.stringify(this.config)); 
            this.navCtrl.setRoot(DashBoardPage);
          }
         
        });
      }, error => {

        // present alert to show message error
        let alert = this.alertCtrl.create({
          title: '¿What?',
          message: error.message,
          buttons: [{
            text: "Ok",
            role: 'cancel',
            handler: data => {
             loading.dismiss();
            }
          }]
        });
        alert.present();
      });

      // loading view dont disable when the new page
      // is loading. I will dismiss manually loading when the
      // tabs view has been loaded
      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
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

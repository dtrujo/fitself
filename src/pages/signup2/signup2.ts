import { TrainingDetailsPage } from './../training-details/training-details';
import { User } from './../../models/user';
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
  user: User;
  unistWeightValue: number;
  unitsWeightType: string; 
  translateUnitsWeightValue: number;
  translateUnitsWeightType: string; 

  /**
    Constructor
  */
  constructor( public navCtrl: NavController,
               public formBuilder: FormBuilder,
               public authData: AuthData,
               public navParams: NavParams,
               public loadingCtrl: LoadingController,
               public alertCtrl: AlertController ) {

    // get user
    this.user = navParams.get('user');

    // set default unit to weight and translate value
    this.unitsWeightType = "Kg";
    this.translateUnitsWeightType = "Lb";
    this.translateUnitsWeightValue = 0;

    // validate form
    this.signup2Form = formBuilder.group({
      city: ['', Validators.required],
      birthday: ['', Validators.required],
      tall: ['', Validators.required],
      weight: ['', Validators.required]
    })
  }

  /**
   [updateUnits description]
   Change units depending if the international
   value is checked or not. Change Kg or Lb
   */
  updateUnits(){
    var weight;

    // Kg units
    if(this.user.international == false){
      this.unitsWeightType = "Lb";
      this.translateUnitsWeightType = "Kg";
      if (this.signup2Form.value.weight){
        this.translateUnitsWeightValue = this.signup2Form.value.weight;
        weight = (this.signup2Form.value.weight * 2.20).toFixed(2);
      }
    
    // Lb units
  } else {
      this.unitsWeightType = "Kg";
      this.translateUnitsWeightType = "Lb";
      if (this.signup2Form.value.weight){
        this.translateUnitsWeightValue = this.signup2Form.value.weight;
        weight = (this.signup2Form.value.weight / 2.20).toFixed(2);
      }
    }
    this.signup2Form.controls[ 'weight' ].setValue(weight);
  }

  /**
    [signupUser description]
  */
  signup2User(){

    if (!this.signup2Form.valid){
      console.log(this.signup2Form.value);
    } else {

      // complete user model
      this.user.city =  this.signup2Form.value.city;
      this.user.birthday =  this.signup2Form.value.birthday;
      this.user.tall =  this.signup2Form.value.tall;
      this.user.weight =  this.signup2Form.value.weight;

      console.log(this.user);

      /*this.authData.signupUser(
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
      }*/
    }
  }
}

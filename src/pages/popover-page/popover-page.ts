import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-popover',
  templateUrl: 'popover-page.html'
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  private viewCtrl: ViewController ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}

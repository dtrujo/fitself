import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover-page.html'
})
export class PopoverPage {
  
  params : any;

  /**
    Constructor
  */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController ) {

      // retrived params
      this.params = navParams;
    }

  /**
    [ close description]
    dismiss popover and pass action to the
    callback function in the parent
  */
  close(action) {

    // data to pass params in to the callback
    let data = {
      params : this.params,
      action : action
    }

    // call dismiss to fired callback
    this.viewCtrl.dismiss(data);
  }
}

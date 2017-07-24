import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BoxesData } from '../../providers/boxes-data';

@Component({
  selector: 'page-boxes',
  templateUrl: 'boxes.html',
})
export class BoxesPage implements OnInit { 
  boxes: any [];
  checkedIdx = 0;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public ngZone: NgZone,
    public boxesData: BoxesData,
    public navParams: NavParams) {

      this.boxes = [ {box: 'Independent', checked: true, id: null} ];
  }

  /**
    [ngOnInit description]
    This event fire any time when user access to the view
  */
  ngOnInit() {

    // get all boxes using an observer and add
    // boxes using push method with the value
    // retrieved of firebase
    this.boxesData.boxes().subscribe(box => {
      this.ngZone.run(() => {
        box.checked = false;
        this.boxes.push(box);
      });
    });
  }

  /**
    [dismiss description]
    closed model view
   */
  dismiss() {
    let data = { 'box': this.boxes[this.checkedIdx] };
    this.viewCtrl.dismiss(data);
  }
}

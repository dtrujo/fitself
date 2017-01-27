import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FriendDetails } from '../friend-details/friend-details';
import { FriendsData } from '../../providers/friends-data';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage implements OnInit {

  friends : any;

  /**
  */
  constructor( public navCtrl: NavController,
               public friendsData: FriendsData,
               public ngZone: NgZone ) {

    this.friends = [];
  }

  /**
    [ngOnInit description]
    This event fire any time when user access to the view
  */
  ngOnInit() {

    // get all exercises using an observer and add
    // exercises using push method with the value
    // retrieved of firebase
    this.friendsData.friends().subscribe(friend => {

      console.log(friend);

      this.ngZone.run(() => {
        this.friends.push(friend);
      });
    });
  }

  /**
    [friendDetails description]
    Return friend details and redirecto to details page
  */
  friendDetails(friend) {
    this.navCtrl.push( FriendDetails, { friend : friend });
  }

  /**
  */
  ionViewDidLoad() {
    console.log('Hello Friends Page');
  }

}

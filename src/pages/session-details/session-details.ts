import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NavController, NavParams, PopoverController, Popover, ViewController, ActionSheetController, } from 'ionic-angular';
import { AddBlockPage } from '../add-block/add-block';
import { AddPartPage } from '../add-part/add-part';
import { SessionData } from '../../providers/session-data';
import { BlockData } from '../../providers/block-data';
import { PartData } from '../../providers/part-data';
import { PopoverPage } from '../popover-page/popover-page';

@Component({
  selector: 'page-session-details',
  templateUrl: 'session-details.html'
})
export class SessionDetailsPage implements OnInit, OnDestroy {
  session : any;
  parts : any [];
  blocks : Array<any> = [];

  blocksSubs : any;
  partsDeleteSubs : any;
  blocksDeleteSubs : any;

  /**
  * Constructor
  */
  constructor( public navCtrl: NavController,
               public sessionData: SessionData,
               public blockData: BlockData,
               public partData: PartData,
               public ngZone: NgZone,
               public params: NavParams,
               public actionSheetCtrl: ActionSheetController,
               public popoverCtrl: PopoverController ) {

    // retrived friends params using NavParams
    this.session = this.params.get("session");

    // remove the part of the list the value
    // which was removed in firebase.
    this.partsDeleteSubs = this.partData.removed().subscribe( id => {
      this.ngZone.run(() => {
        let i = 0;
        this.blocks.forEach(function(block) {
          block.Parts.forEach(function(part) {
            if (id == part.Id)
              block.Parts.splice(i, 1);
            i++;
          });
          i = 0;
        });
      });
    });

    // remove the block of the list the value
    // which was removed in firebase.
    this.blocksDeleteSubs = this.blockData.removed().subscribe( id => {
      this.ngZone.run(() => {
        let i = 0, index = 0;
        this.blocks.forEach(function(block) {
            if (id == block.Id)
              index = i;
            i++;
        });
        this.blocks.splice(index, 1);
      });
    });
  }

  /**
    [ngOnInit description]
    This event fire any time when user access to the view
    When fire we need to retrieved the sessionDetails calling
    the services.
  */
  ngOnInit() {
    this.blocksSubs = this.blockData.blocks( this.session.Id ).subscribe ( block => {
      this.ngZone.run(() => {
          this.blocks.push(block);
      });
    });
  }

  /**
    [ngOnDestroy description]
    Destroy subscription when the view
    is detroyed. Not duplicate responses
  */
  ngOnDestroy() {
    this.blocksSubs.unsubscribe();
    this.blocksDeleteSubs.unsubscribe();
    this.partsDeleteSubs.unsubscribe();
  }

  /**
    [presentActionSheet description]
    Create and show secondary actions
  */
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Session Actions',
      buttons: [
        {
          text: 'Add',
          handler: () => {
            this.navCtrl.push( AddBlockPage, { id : this.session.Id } );
          }
        },{
          text: 'Edit',
          handler: () => {
            console.log('Delete clicked');
          }
        },{
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
    [goToAddPart description]
    go to add part page
    @param {string} idBlock [block's id]
  */
  goToAddPart( idBlock ){
    this.navCtrl.push( AddPartPage, { idBlock : idBlock } );
  }

  /**
    [deletePart description]
    remove part to the block list
    @param {string} idBlock [block's id]
    @param {string} idPart  [part's id]
  */
  deletePart ( idBlock, idPart ){
    this.partData.remove(  idBlock, idPart );
  }

  /**
    [deleteBlock description]
    remove block to the session list
    @param {string} idBlock   [block's id]
  */
  deleteBlock ( idBlock ){
    this.blockData.remove( this.session.Id, idBlock );
  }

  /**
    [presentPopover description]
    presento popover to create actions over block
    @param {string} idSession [session's id]
    @param {string} idBlock   [block's id]
  */
  presentPopover(myEvent, idBlock) {

    // create popover and pass data
    let popover = this.popoverCtrl.create(
      PopoverPage, { idBlock : idBlock }
    );

    // present popover
    popover.present({ ev: myEvent });

    // callback actions and retrived data
    // we passing the data into the popover controller
    // actions and the elements necesary to complete the actions
    popover.onDidDismiss(data => {

      // call action depending click options over popover
      if (data){
        switch (data.action) {
          case 'add':
            this.goToAddPart(data.params.get('idBlock'));
          break;
          case 'edit':
            console.log('edit block');
          break;
          case 'remove':
            this.deleteBlock( data.params.get('idBlock') );
          break;
        }
      }
    });
  }
}

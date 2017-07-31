import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop'

/*
  Class for the Media provider.
*/
@Injectable()
export class MediaData {

  /*
  *
  */
  constructor(
    public http: Http,
    public platform: Platform,
    private camera: Camera,
    private crop: Crop) {
    }

  /**
   [toDataUrlBase64 description]
   convert image using uri to image using
   base64 format
   */
  toDataUrlBase64(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  /**
    [getMedia description]
    Return a promise to catch errors while loading image
  */
  getMedia(source: number) : Promise<any> {
    
    let options = {
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: source,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100      
    }

    // Get Image from ionic-native's built in camera plugin
    return this.camera.getPicture(options).then((fileUri) => {
      return this.crop.crop(fileUri, { quality: 100 });
    });
  }
}

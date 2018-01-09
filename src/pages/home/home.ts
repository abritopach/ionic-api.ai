import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';

declare var ApiAIPromises: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  answer: any;

  constructor(public navCtrl: NavController, public platform: Platform, public ngZone: NgZone) {
    platform.ready().then(() => {
      ApiAIPromises.init({
        clientAccessToken: "52b5d54f14d94d649a5998918b396628"
      })
      .then((result) =>  console.log(result))
    });
  }

  ask(question) {
    ApiAIPromises.requestText({
      query: question
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(()=> {
         this.answer = speech;
       });
    })
  }

}

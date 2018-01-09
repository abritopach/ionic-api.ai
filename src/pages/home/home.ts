import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { WeatherAgentProvider } from '../../providers/weather-agent/weather-agent';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages: any = [];
  chatBox: string = '';
  from: {
    "user": "Usuario",
    "bot": "Agente"
  }

  constructor(public navCtrl: NavController, public platform: Platform, public weatherAgent: WeatherAgentProvider) {
    this.weatherAgent.conversation.subscribe(res => {
      this.messages = [...this.messages, ...res];
    });
  }

  send(chatBox) {
    //console.log(chatBox);
    this.weatherAgent.talk(chatBox).then(() => {
      this.chatBox = '';
    });
  }
}

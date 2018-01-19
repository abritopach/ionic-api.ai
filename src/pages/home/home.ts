import { Component, ViewChild } from "@angular/core";
import { Platform, Content, NavController, ModalController } from "ionic-angular";

import { WeatherAgentProvider } from "../../providers/weather-agent/weather-agent";

import { WeatherAnimationModalPage } from '../../modals/weather-animation-modal';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  messages: any = [];
  chatBox: string = "";
  from: {
    user: "Usuario";
    bot: "Agente";
  };
  @ViewChild(Content) content: Content;
  currentDate = Date.now();

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public weatherAgent: WeatherAgentProvider,
    public modalCtrl: ModalController
  ) {
    this.weatherAgent.conversation.subscribe(res => {
      this.messages = [...this.messages, ...res];
      this.scrollToBottom();
    });
  }

  send(chatBox) {
    //console.log(chatBox);
    this.weatherAgent.talk(chatBox).then(() => {
      this.chatBox = "";
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  keyPressHandler(keyCode, chatBox) {
    //console.log("keyPressHandler", keyCode);
    // Pressed enter key.
    if (keyCode == 13) {
      this.weatherAgent.talk(chatBox).then(() => {
        this.chatBox = "";
      });
    }
  }

  onClickWeatherIcon() {
    console.log("onClickWeatherIcon");
    let modal = this.modalCtrl.create(WeatherAnimationModalPage);
    modal.present();
  }
}

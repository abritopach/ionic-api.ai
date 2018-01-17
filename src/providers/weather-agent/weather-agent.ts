import { Injectable } from "@angular/core";
import { ApiAiClient } from "api-ai-javascript";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import * as moment from 'moment';

/*
  Generated class for the WeatherAgentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class Message {
  constructor(public msg: string, public from: string, public iconURL) {}
}

@Injectable()
export class WeatherAgentProvider {
  private readonly client = new ApiAiClient({
    accessToken: "52b5d54f14d94d649a5998918b396628"
  });
  private readonly baseIconUrl = "http://openweathermap.org/img/w/";
  conversation = new BehaviorSubject<Message[]>([]);
  weatherDay: string = "today";

  constructor() {
    //console.log("Hello WeatherAgentProvider Provider");
  }

  // Sends and receives messages via DialogFlow.
  talk(msg: string) {
    const userMessage = new Message(msg, "user", "");
    this.update(userMessage);
    this.detectWeatherDay(userMessage);

    return this.client
      .textRequest(msg)

      .then(res => {
        const speech = res.result.fulfillment.speech;
        let iconURL = "";
        let formatedMessage = "";

        if (typeof res.result.fulfillment["data"] !== "undefined") {
          let index = this.getIndex(res.result.fulfillment["data"]);
          formatedMessage = this.formatBotMessage(res.result.fulfillment["data"], index);
          iconURL = this.baseIconUrl + res.result.fulfillment["data"].list[index].weather[0].icon + ".png";
        }


        const botMessage = new Message(speech + "\n" + formatedMessage, "bot", iconURL);

        this.update(botMessage);
      })
      .catch(error => {
        /* do something here too */
      });
  }

  // Adds message to source.
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  detectWeatherDay(userMessage) {
    if (userMessage.msg.toLowerCase().indexOf("hoy") != -1) {
      this.weatherDay = "today";
    }
    if (userMessage.msg.toLowerCase().indexOf("mañana") != -1) {
      this.weatherDay = "tomorrow";
    }
    //console.log("weatherDay: ", this.weatherDay);
  }

  getIndex(data) {
    let index = 0;
    if (this.weatherDay == "tomorrow") {
      let tomorrowStr = moment().add(1,'days').format("YYYY-MM-DD"); 
      // Iterate to get index from time tomorrow at 12:00 p.m.
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt == tomorrowStr + " 12:00:00") {
          index = i;
        }
      }
    }
    return index;
  }

  formatBotMessage(data, index) {
    //console.log(data);
    let message = this.capitalizeFirstLetter(data.list[index].weather[0].description) + ", " + data.list[index].main.temp + "°С temperature from " +
     data.list[index].main.temp_min + " to " + data.list[index].main.temp_max + " °С, wind " + data.list[index].wind.speed + " m/s, " +
     data.list[index].main.pressure + " hpa";
    return message;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

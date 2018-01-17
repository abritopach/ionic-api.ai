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
    this.detectWeatherDay(userMessage);

    this.update(userMessage);

    return this.client
      .textRequest(msg)

      .then(res => {
        const speech = res.result.fulfillment.speech;
        let iconURL = "";
        let formatedMessage = "";

        if (typeof res.result.fulfillment["data"] !== "undefined") {
          formatedMessage = this.formatBotMessage(res.result.fulfillment["data"]);
          iconURL = this.baseIconUrl + res.result.fulfillment["data"].list[0].weather[0].icon + ".png";
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
    //console.log("weatherDay", this.weatherDay);
  }

  formatBotMessage(data) {
    //console.log(data);
    let message = "";
    if (this.weatherDay == "today") {
      // Get current main weather.
      message = this.capitalizeFirstLetter(data.list[0].weather[0].description) + ", " + data.list[0].main.temp + "°С temperature from " + data.list[0].main.temp_min + " to " + data.list[0].main.temp_max + " °С, wind " +
      data.list[0].wind.speed + " m/s, " + data.list[0].main.pressure + " hpa";
    }
    if (this.weatherDay == "tomorrow") {
      let tomorrowStr = moment().add(1,'days').format("YYYY-MM-DD"); 
      // Iterate to get time tomorrow at 12:00 p.m.
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt == tomorrowStr + " 12:00:00") {
          message = this.capitalizeFirstLetter(data.list[0].weather[0].description) + ", " + data.list[i].main.temp + "°С temperature from " + data.list[i].main.temp_min + " to " + data.list[i].main.temp_max + " °С, wind " +
          data.list[i].wind.speed + " m/s, " + data.list[i].main.pressure + " hpa";
        }
      }
    }
    return message;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

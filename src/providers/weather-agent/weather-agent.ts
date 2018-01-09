import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';  
import { BehaviorSubject } from 'rxjs/BehaviorSubject';  

/*
  Generated class for the WeatherAgentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class Message {  

  constructor(public msg: string, public from: string) { }  

}  

@Injectable()
export class WeatherAgentProvider {

  private readonly client = new ApiAiClient({ accessToken: '52b5d54f14d94d649a5998918b396628' });  
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {
    console.log('Hello WeatherAgentProvider Provider');
  }

  // Sends and receives messages via DialogFlow.
  talk(msg: string) {  

    const userMessage = new Message(msg, 'user');  
    //console.log(userMessage);

    this.update(userMessage);  

    return this.client.textRequest(msg)  

      .then(res => {  

        const speech = res.result.fulfillment.speech; 
        
        //console.log("speech", speech);

        const botMessage = new Message(speech, 'bot');  

        this.update(botMessage);  

      })
      .catch((error) => {/* do something here too */});  

  }  

  // Adds message to source.
  update(msg: Message) {  
    this.conversation.next([msg]);  
  }  

}

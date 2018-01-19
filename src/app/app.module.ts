import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { WeatherAgentProvider } from "../providers/weather-agent/weather-agent";

import { FormatDatePipe } from "../pipes/format-date/format-date";

import { WeatherAnimationModalPage } from '../modals/weather-animation-modal';

@NgModule({
  declarations: [MyApp, HomePage, FormatDatePipe, WeatherAnimationModalPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, WeatherAnimationModalPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WeatherAgentProvider
  ]
})
export class AppModule {}

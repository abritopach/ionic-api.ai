import { Component, Renderer } from '@angular/core';
import { ViewController } from 'ionic-angular';
import * as dateFns from 'date-fns';

@Component({
    selector: 'weather-animation-modal',
    templateUrl: 'weather-animation-modal.html'
})
export class WeatherAnimationModalPage {

    timeOfDay: Date = new Date();
    timeString: string = '12:00';

    sky: any;
    entireSun: any;
    allClouds: any;
    clouds: any;
  
    constructor(public viewCtrl: ViewController, public renderer: Renderer) {
    }

    ionViewDidLoad(){
        this.timeString = dateFns.format(this.timeOfDay, 'h:mm A');

        this.sky = document.querySelector('linearGradient [offset="1"]');
        this.entireSun = document.querySelector('#Sun');
        this.clouds = document.querySelectorAll('#Clouds path');
 
        this.setTransitions();
    }

    setTransitions(){
 
        this.renderer.setElementStyle(this.sky, 'transition', '1s linear');
        this.renderer.setElementStyle(this.entireSun, 'transition', '1s linear');
 
        this.clouds.forEach((cloud) => {
            this.renderer.setElementStyle(cloud, 'transition', '1s linear');
        });
 
    }
 
    setNight(){
 
        this.renderer.setElementAttribute(this.sky, 'stop-color', '#141944');
        this.renderer.setElementAttribute(this.entireSun, 'transform', 'translate(1, 2000)');
        this.renderer.setElementAttribute(this.entireSun, 'opacity', '1');
 
        this.clouds.forEach((cloud) => {
            this.renderer.setElementStyle(cloud, 'fill', '#fff');
            this.renderer.setElementStyle(cloud, 'opacity', '0.2');
        });
 
    }
 
    setDay(){
 
        this.renderer.setElementAttribute(this.sky, 'stop-color', '#50a7dd');
        this.renderer.setElementAttribute(this.entireSun, 'opacity', '1');
        this.renderer.setElementAttribute(this.entireSun, 'transform', 'translate(1, 1)');
 
        this.clouds.forEach((cloud) => {
            this.renderer.setElementStyle(cloud, 'fill', '#fff');
            this.renderer.setElementStyle(cloud, 'opacity', '1');
        });
 
    }
 
    setSunset(){
 
        this.renderer.setElementAttribute(this.entireSun, 'transform', 'translate(1, 1000)');
        this.renderer.setElementAttribute(this.entireSun, 'opacity', '1');
        this.renderer.setElementAttribute(this.sky, 'stop-color', '#e2905a');
 
        this.clouds.forEach((cloud) => {
            this.renderer.setElementStyle(cloud, 'fill', '#e2c1d8');
            this.renderer.setElementStyle(cloud, 'opacity', '0.4');
        });
 
    }
 
    setCloudy(){
        this.renderer.setElementAttribute(this.sky, 'stop-color', '#cecece');
        this.renderer.setElementAttribute(this.entireSun, 'transform', 'translate(1, 1)');
        this.renderer.setElementAttribute(this.entireSun, 'opacity', '0.2');
 
        this.clouds.forEach((cloud) => {
            this.renderer.setElementStyle(cloud, 'fill', '#fff');
            this.renderer.setElementStyle(cloud, 'opacity', '1');
        });
    }
 

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
import { Injectable } from '@angular/core';

@Injectable()
export class ToggleService {
  isToggle:boolean=false;

  constructor(){

  }
  toggle(){
    console.log("toggle");

  }
}
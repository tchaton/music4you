import { Component,Input } from '@angular/core';

@Component({
  selector: 'track',
  template: `
   <div> HELLO </div>
  `
})
export class TrackComponent {
  @Input track:any
  constructor() {
  }

}
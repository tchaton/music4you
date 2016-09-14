import {Component} from '@angular/core';
import { Control } from '@angular/common';
import {ListenService} from './listen.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { window } from '@angular/platform-browser/src/facade/browser';
import {AlbumsComponent} from "./albums.component";

@Component({
  selector: 'my-listen',
	templateUrl: 'app/listen.component.html',
  styleUrls:  ['app/listen.component.css'],
  directives:[AlbumsComponent],
  providers:[ListenService]
})
export class ListenComponent { 
  id:string;
  artist:Observable<any>;
  hide:boolean=false;
  search = new Control();
  results: Observable<any>;
  results2: Observable<any>;
  constructor(public listenservice:ListenService) {

   //observable of results
   this.results = 
   //input value change observable
    this.search.valueChanges
      .debounceTime(200) //debounce for 200ms
      .switchMap(query => listenservice.searchYT(query));

   this.results2 = 
   //input value change observable
    this.search.valueChanges
      .debounceTime(200) //debounce for 200ms
      .switchMap(query => listenservice.searchSpotify(query));

      //switchMap flattens the async and cancels the pending request if a new value is requested
  }
  selectVideo(video:any){
    console.log(this.listenservice.youtube.player);
    if(this.listenservice.youtube.player == null){
          this.id = video.id.videoId;
          this.hide = true;
          this.listenservice.createPlayer(video);
    }
    else{
      this.listenservice.destroyPlayer();
      this.id = video.id.videoId;
      this.hide = true;
      this.listenservice.createPlayer(video);
    }
  }
/*  getYTState(){
    this.state = this.listenservice.getYoutube().state;
  }*/
  controlVideo(){
    if(this.listenservice.youtube.player != null){
          this.listenservice.play();
    }

    }
}

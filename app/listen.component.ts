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
  search2 = new Control();
  results: Observable<any>;
  results2: Observable<any>;
  querySpotify:string;
  queryYT:string;
  videoSelected:any;
  videoMouseOver:any;
  subscription: any;
  state:string='';
  stateNumber:number;
  albumsMouseOver:any;
  constructor(public listenservice:ListenService) {

   //observable of results
   this.results = 
   //input value change observable
    this.search2.valueChanges
      .debounceTime(200) //debounce for 200ms
      .switchMap(query => listenservice.searchYT(query));



   this.results2 = 
   //input value change observable
    this.search.valueChanges
      .debounceTime(200) //debounce for 200ms
      .switchMap(query => listenservice.searchSpotify(query));

    this.subscription = this.listenservice.getStateEvent()
      .subscribe((event:any) => 
        {if(event.data == 0) 
        {
          this.state='ended';
        } else if (event.data == 1) 
        {
          this.state='playing';
        }else if (event.data == 2)
        {
          this.state='paused';
        }else
        {this.state='loading';
        }});
      //switchMap flattens the async and cancels the pending request if a new value is requested
  }
  selectVideo(video:any){
    this.videoSelected = video;
    console.log(this.listenservice.youtube.player == null);
    if(this.listenservice.youtube.player == null){
          this.id = video.id.videoId;
          this.hide = true;
          this.listenservice.createPlayer(video);
    }
    else{
      console.log(this.listenservice.youtube.player);
      if(this.listenservice.youtube.player.a.value != video.id.videoId){
      this.listenservice.destroyPlayer();
      this.id = video.id.videoId;
      this.hide = true;
      this.listenservice.createPlayer(video);        
      }
    }
  }
/*  getYTState(){
    this.state = this.listenservice.getYoutube().state;
  }*/
  controlVideo(){
    if(this.state == 'paused'){
      console.log('do play');
      this.listenservice.play();
    }
    else if(this.state == 'playing'){
      console.log('do pause');
      this.listenservice.pause();
    }

  }
  handleMyEvent(event:any){
      console.log(event.target.value);
      this.queryYT = event.target.value;
  }
  queue(id:string)
  {
    console.log('queue');
    this.listenservice.queue(id);
  }
  mouseOVer(video:any){
    console.log(video);
    this.videoMouseOver = video;

  }
  mouseLeave(){
    this.videoMouseOver = null;
  }
  mouseOverSpotify(albums:any){
    this.albumsMouseOver = albums;
  }
}

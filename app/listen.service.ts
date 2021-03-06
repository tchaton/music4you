import { Injectable,EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, HTTP_BINDINGS, Response} from '@angular/http';
import { window } from '@angular/platform-browser/src/facade/browser';


const YOU_TUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
const SPOTIFY_URL = 'https://api.spotify.com/v1/search';
const YOU_TUBE_TOKEN = 'AIzaSyB_1YeJqsDK15qzzA8PtNQKYtRMSuYqXao';
const SPOTIFY_TOKEN = '9ee8664f52e84c32b690536abe4383c7';

@Injectable()
export class ListenService {
  private service = this;
  public youtube:any = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '360',
    playerWidth: '100%',
    state: 'stopped'
  };
  YT:any;
  stateEvent: EventEmitter<any> = new EventEmitter();
  state:string;
  constructor(private _http:Http){
    if(window['YT']){
      this.YT=window['YT'];
    }
  }
  
  searchYT(query:string){
    return this._http.get(`${YOU_TUBE_URL}?q=${query}&type=video&maxResults=8&part=id,snippet&fields=items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle&key=${YOU_TUBE_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
  }
  searchSpotify(query:string){
    return this._http.get(`${SPOTIFY_URL}?q=${query}&type=artist&key=${SPOTIFY_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.artists.items);
  }
  searchSpotifyAlbums(id:string){
    return this._http.get('https://api.spotify.com/v1/artists/'+id+'/albums')
      .map((res:Response) => res.json())
      .map(json => json.items);
  }
  searchSpotifyTracks(id:string){
    return this._http.get(' https://api.spotify.com/v1/albums/'+id+'/tracks')
      .map((res:Response) => res.json())
      .map(json => json.items);
  }
  createPlayer(video:any){
      if (window['YT']) {
        this.youtube.player = new this.YT.Player('player', {
        height: this.youtube.playerHeight,
        width: this.youtube.playerWidth,
        videoId : video.id.videoId,
        playerVars: {
          rel: 1,
          showinfo: 0,
          controls:1,
          autoplay:1
        },
        events: {
          'onReady': this.onYoutubeReady,
          'onStateChange': ((ev:any) => this.emitStateEvent(ev))
        }
      });
      }
  }
  onYoutubeReady(){
    console.log('onYoutubeReady');
  }
  destroyPlayer(){
    this.youtube.player.destroy();
    this.youtube.player = null;
  }
  getYoutube(){
  	console.log('getYoutube');
  	return this.youtube;
  }
  play(){
  	this.youtube.player.playVideo();
  }
  pause(){
    this.youtube.player.pauseVideo();
  }
  queue(id:string){
    this.youtube.player.cueVideoById(id);
  }
  emitStateEvent(event:any) {
    console.log('emitStateChange');
    this.stateEvent.emit(event);
  }
  getStateEvent() {
    return this.stateEvent;
  }
}
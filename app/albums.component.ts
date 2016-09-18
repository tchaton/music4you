import {Component,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import { Control } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {ListenService} from './listen.service';
import {Http, HTTP_BINDINGS, Response} from '@angular/http';
import { window } from '@angular/platform-browser/src/facade/browser';
import { SafeResourceUrl, DomSanitizationService,BROWSER_SANITIZATION_PROVIDERS } from '@angular/platform-browser';

const YOU_TUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
const SPOTIFY_URL = 'https://api.spotify.com/v1/search';
const YOU_TUBE_TOKEN = 'AIzaSyB_1YeJqsDK15qzzA8PtNQKYtRMSuYqXao';
const SPOTIFY_TOKEN = '9ee8664f52e84c32b690536abe4383c7';

@Component({
  selector: 'albums',
	template : `
  <div *ngIf="item" (click)="selectArtist(item.id)">
    <img class="imageArtist" [hidden]='albumId == item.id && albumLoaded==true'  *ngIf="item.images[0]" [src]="item.images[0].url"/>
    {{item.name}}
  </div>
  <div *ngIf="albums" >
  <div id="albumsContainer">
    <div class="album" *ngFor="let album of albums" >
     <div class="row">
      <div class="col-md-4">
        <img (mouseover)="selectAlbum(album.id)" *ngIf="album.images[0]" [src]="album.images[0].url"  width="auto" height="100px" />
      </div>
      </div>
    </div>
    </div>
    <div class="description">
      <div *ngIf="tracks" >
          <div *ngFor="let track of tracks" >
              <button value='{{item.name}} {{track.name}}' (click)='getTrack(track,$event)'>{{track.name}}</button>
              <!--<div *ngIf="track === selectedTrack ">
                <iframe class="iframe" id="track.id" [src]="getUrlPreview(track)" frameborder="0" allowtransparency="true"></iframe>
                <button (click)='suppres(track)'>suppress</button>
              </div>-->
          </div>
      </div>
    </div>
  </div>
  `,
  styleUrls:  ['app/albums.component.css'],
  providers: [ DomSanitizationService,BROWSER_SANITIZATION_PROVIDERS],
})


export class AlbumsComponent { 
  @Input() item:any;
  @Output() selectedTrackEvent:EventEmitter<any>= new EventEmitter();
  albums:any;
  albumId:any;
  albumLoaded:any=false;
  tracks:any;
  selectedTrack:any;
  constructor(public listenservice:ListenService,public sanitizer: DomSanitizationService,private _elementRef : ElementRef) {
   
  }
  selectArtist(id:any) {
    this.listenservice.searchSpotifyAlbums(id)
                     .subscribe(
                       items => this.albums = items);
    this.albumId = id;
    this.albumLoaded = true;
  }
  selectAlbum(id:any) {
    this.listenservice.searchSpotifyTracks(id)
                     .subscribe(
                       items => this.tracks = items);
  }
  getTrack(track:any,event:any){
    console.log("track.uri");
    console.log(track.uri);
    this.selectedTrack = track;
    this.selectedTrackEvent.next(event);
  }
  getUrl(track:any)
  {

       return this.sanitizer.bypassSecurityTrustResourceUrl("https://embed.spotify.com/?uri="+track.uri+"");
  }
  getUrlPreview(track:any)
  {
       return this.sanitizer.bypassSecurityTrustResourceUrl(track.preview_url);
  }
  suppres(track:any){
    let el : HTMLElement = this._elementRef.nativeElement;
    el.parentNode.removeChild(el);
  }
}   
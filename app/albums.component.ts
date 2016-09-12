import {Component,Input} from '@angular/core';
import { Control } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { window } from '@angular/platform-browser/src/facade/browser';
import {ListenService} from './listen.service';
import {Http, HTTP_BINDINGS, Response} from '@angular/http';
import { window } from '@angular/platform-browser/src/facade/browser';
import { SafeResourceUrl, DomSanitizationService,BROWSER_SANITIZATION_PROVIDERS } from '@angular/platform-browser';
import {Video} from './video'

const YOU_TUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
const SPOTIFY_URL = 'https://api.spotify.com/v1/search';
const YOU_TUBE_TOKEN = 'AIzaSyB_1YeJqsDK15qzzA8PtNQKYtRMSuYqXao';
const SPOTIFY_TOKEN = '9ee8664f52e84c32b690536abe4383c7';

@Component({
  selector: 'albums',
	template : `
  <div *ngIf="item" (click)="selectArtist(item.id)">
    <img class="imageArtist" [hidden]='albumId == item.id && albumLoaded==true'  *ngIf="item.images[0]" [src]="item.images[0].url"/>
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
              <button (click)='getTrack(track)'>{{track.name}}</button>
              <div *ngIf="track === selectedTrack ">
                <iframe [src]="getUrlPreview(track)" frameborder="0" allowtransparency="true"></iframe>
                <iframe [src]="getUrl(track)" frameborder="0" allowtransparency="true"></iframe>
              </div>
          </div>
      </div>
    </div>
  </div>
  `,
  styleUrls:  ['app/albums.component.css'],
  providers: [ DomSanitizationService,BROWSER_SANITIZATION_PROVIDERS],
})


export class AlbumsComponent { 
  @Input() item;
  albums;
  albumId;
  albumLoaded=false;
  tracks;
  selectedTrack;
  constructor(public listenservice:ListenService,public sanitizer: DomSanitizationService) {

  }
  selectArtist(id) {
    this.listenservice.searchSpotifyAlbums(id)
                     .subscribe(
                       items => this.albums = items);
    this.albumId = id;
    this.albumLoaded = true;
  }
  selectAlbum(id) {
    this.listenservice.searchSpotifyTracks(id)
                     .subscribe(
                       items => this.tracks = items);
  }
  getTrack(track){
    console.log("track.uri");
    console.log(track.uri);
    this.selectedTrack = track;
  }
  getUrl:SafeResourceUrl(track)
  {

       return this.sanitizer.bypassSecurityTrustResourceUrl("https://embed.spotify.com/?uri="+track.uri+"");
  }
  getUrlPreview:SafeResourceUrl(track)
  {
/*       const headers: Headers = new Headers();
       headers.append('Accept', 'application/json');
       headers.append('Content-Type', 'application/json');
       headers.append('Access-Control-Allow-Origin', '*');
       return this.sanitizer.bypassSecurityTrustResourceUrl({url:"https://embed.spotify.com/?uri="+track.uri+"",headers:headers});*/
       return this.sanitizer.bypassSecurityTrustResourceUrl(track.preview_url);
  }
}   
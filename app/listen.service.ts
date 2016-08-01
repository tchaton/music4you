import { Injectable } from '@angular/core';

import {Http, HTTP_BINDINGS, Response} from '@angular/http';


const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyB_1YeJqsDK15qzzA8PtNQKYtRMSuYqXao';

@Injectable()
export class ListenService {
  constructor(private http:Http){}
  
  search(query:string){
    return this.http.get(`${BASE_URL}?q=${query}&part=snippet&key=${API_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
  }
}
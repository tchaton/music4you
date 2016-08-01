import {Component} from '@angular/core';
import { Control } from '@angular/common';
import {ListenService} from './listen.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'my-listen',
	templateUrl: 'app/listen.component.html',
  styleUrls:  ['app/listen.component.css'],
  providers:[ListenService]
})
export class ListenComponent { 

  search = new Control();
  results: Observable<any>;
  constructor(public listenservice:ListenService) {
   
   //observable of results
   this.results = 
   //input value change observable
    this.search.valueChanges
      .debounceTime(200) //debounce for 200ms
      .switchMap(query => listenservice.search(query));
      //switchMap flattens the async and cancels the pending request if a new value is requested
  }
}	    
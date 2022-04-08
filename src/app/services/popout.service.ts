import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopoutService {

  private defaultMessage = new BehaviorSubject<string>("");
  public message = this.defaultMessage.asObservable();
  constructor() { }
  
  public setMessage(s:string):void {
    this.defaultMessage.next(s);
    // To get message just sub to public message
  }
  
}

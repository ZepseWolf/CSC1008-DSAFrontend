import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopoutService } from 'src/app/services/popout.service';

@Component({
  selector: 'app-popout',
  templateUrl: './popout.component.html',
  styleUrls: ['./popout.component.scss']
})
export class PopoutComponent implements OnInit,AfterContentInit {

  @ViewChild("popout")popout!: ElementRef;
  public message:string ="";
  private lock:boolean = false;

  constructor(private _popoutService : PopoutService ) { }
  
  ngAfterContentInit(): void {
    this._popoutService.message.subscribe((data)=>{
      if(data){
        this.message = data;
        this.display();
      }
    })
  }

  ngOnInit(): void {
  }
  

  private display():void {
    if(!this.lock){
      this.popout.nativeElement.style.animation = "fadeIn 1s forwards";
      setTimeout(()=>{
        this.popout.nativeElement.style.animation = "fadeOut 1s";
        this.lock = false;
      },3000)
    }
  }
}

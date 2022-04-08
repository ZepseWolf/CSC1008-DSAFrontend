import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';

//Service



@Injectable({
  providedIn: 'root'
})
// This life cycle service aim to ensure the setup of security and loading of image/svg is completed.
export class LifeCycleService {
  private isCompleted = new BehaviorSubject<Boolean>(false);
  public completedLifeCycle = this.isCompleted.asObservable();

  private img_count = 0;
  private img_check = 0;
  private svg_count = 0;
  private svg_check = 0;

  private img_completed = false;
  private svg_completed = false;
  private page_visited = true;

  private loadedPage:string[] = [];
  constructor(){ 
    
  }

  public addImageCount():void{
    this.img_count++;
  }

  public updateCompletedNormalLoad():void {
    // For image 
    this.img_check++;
    if(this.img_count == this.img_check){
      this.img_completed = true;
      this.hasEnded();
    }
    else if (this.img_count < this.img_check){
      this.img_completed = false;
      console.error("The check should not be bigger then count ! (IMG)");
    }
    else{
      this.img_completed = false;
    }
  }

  public addSvgCount():void{
    this.svg_count++;
  }

  public updateCompletedSvgLoad():void{
    this.svg_check++;
    if(this.svg_count == this.svg_check){
      this.svg_completed = true;
      this.hasEnded();
    }
    else if (this.svg_count < this.svg_check){
      console.error("The check should not be bigger then count ! (SVG)");
      this.svg_completed = false;
    }
    else{
      console.error("SVG go false");
      this.svg_completed = false;
    }
  }

  public initCheck(): void {
    if(this.svg_count == 0 && this.img_count == 0){
      this.img_completed = true;
      this.svg_completed = true;
      this.hasEnded();
    }
    else if(this.svg_count == 0 && this.img_count != 0){
      this.svg_completed = true;
    }
    else if(this.svg_count != 0 && this.img_count == 0){
      this.img_completed = true;
    }
    console.log("Init checks function img: " , this.img_completed , " svg : ",this.svg_completed)
  }

  public updateCompletedHandshake(): void{
    // Checked by app.comp
  }

  public updateCompletedVerification(): void{
    // Checked by app.comp
    
  }

  public checkLoadedPages(url:string): void{
    console.log("%c Page Started loading! " , ' color: #29a34a', performance.now() );
    if(this.loadedPage.includes(url)){
      this.page_visited = true;
    }
    else{
      this.page_visited =false;
      this.loadedPage.push(url);
    }
  }

  public isLoadedPages(): boolean{
    return this.page_visited;
  }

  public hasEnded(): void{
    if(this.svg_completed && this.img_completed ){
      this.isCompleted.next(true);
      // You can set your loader animation here eg. this._animationService.openCurtain()
      
      // Reset the values
      this.img_count = 0;
      this.img_check = 0;
      this.svg_count = 0;
      this.svg_check = 0;
      console.log("%c Page finished loading at " , ' color: #29a34a', performance.now() );
    }
    

  }

}

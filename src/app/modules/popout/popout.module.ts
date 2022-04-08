import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoutComponent } from './popout.component';

@NgModule({
  declarations: [
    PopoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PopoutComponent
  ]
})
export class PopoutModule { }

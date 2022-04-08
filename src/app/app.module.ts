import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// UI
import {MatIconModule} from '@angular/material/icon';
import { PopoutModule } from './modules/popout/popout.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    PopoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

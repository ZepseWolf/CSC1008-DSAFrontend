
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsComponent } from './forms.component';
import { MapComponent } from '../map/map.component';


@NgModule({
    declarations: [
      FormsComponent,
    ],
    imports: [
      CommonModule,
      MatSidenavModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule
    ]
  })
  export class FormsModule { }
  
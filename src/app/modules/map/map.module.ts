import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//Routes
import { MapRoutingModule } from './map-routing.module';

//UI
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import{ ReactiveFormsModule }from '@angular/forms';

//Component
import { MapComponent } from './map.component';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MapRoutingModule
  ]
})
export class MapModule { }

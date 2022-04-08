import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Route
import { LoginRoutingModule } from './login-routing.module';

// Component
import { LoginComponent } from './login.component';
import { PopoutComponent } from '../popout/popout.component';

// UI
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import{ MatInputModule }from '@angular/material/input';
import{ MatSelectModule }from '@angular/material/select';
import{ MatButtonModule }from '@angular/material/button';
import{ MatCheckboxModule }from '@angular/material/checkbox';
import{ MatChipsModule }from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';

// Form 
import{ ReactiveFormsModule }from '@angular/forms';



// import { CustomDirectiveModule } from 'src/app/directives/custom-directive.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [  
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule ,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class LoginModule { }

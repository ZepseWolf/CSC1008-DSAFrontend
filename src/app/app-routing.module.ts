import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Modules
import { LoginModule } from './modules/login/login.module';
import { MapModule } from './modules/map/map.module';

const routes: Routes = [
  {path: '' , redirectTo: 'login' , pathMatch: 'full' },
  {
    path: 'login',
    loadChildren:() => LoginModule
  },
  {
    path: 'map',
    loadChildren:() => MapModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

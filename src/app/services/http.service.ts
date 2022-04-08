import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly url:string = "https://csc1008-ride-testing-app.herokuapp.com/api"; // In .env supposedly
  constructor(private http: HttpClient) { }

  // ------------------------------------ Login ------------------------------------
  public postLogin(_loginForm:any) {
    return this.http.post<any>(this.url+"/login/login",_loginForm.value );
  }

  public checkIsLogin(){
    return this.http.get<any>(this.url+"/login/isloggedin");
  }

  public logout(){
    this.http.get<any>(this.url+"/login/logout" ).subscribe(data => {
      console.log(data.message);
    })
  }
  

  // ------------------------------------ User --------------------------------
  public postRegister(_registerForm:any){
    return this.http.post<any>(this.url+"/users/register",_registerForm.value );
  }
  
  public getUserData(id:string){
    return this.http.get<any>(this.url+"/users/"+id);
  }

  public postPostal(_postalForm:any) {
    return this.http.post<any>(this.url+"/postal", {params: _postalForm.value})
  }

  public getTest() {
    return this.http.get<any>(this.url+"/postal/test")
  }

  public getAll() {
    return this.http.get<any>(this.url+"/postal/test/all")
  }

  public getVertex() {
    return this.http.get<any>(this.url+"/routing/all")
  }

  public postDemo(_demoForm:any) {
    return this.http.post<any>(this.url+"/routing/test", {params: _demoForm.value})
  }
}

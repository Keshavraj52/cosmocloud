import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp, users } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  profile=new EventEmitter<users[]|[]>()
  invalidUserAuth=new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(user:signUp){
    this.http.post("http://localhost:3000/users",user,{observe:'response'})
    .subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/']);
      }
    })
  }
  userLogin(data:login){
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body?.length){
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user',JSON.stringify(result.body[0]))
        this.router.navigate(['/']);
      }
      else{
        this.invalidUserAuth.emit(true)
      }
    })
      
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  getuser(id:string){
    return this.http.get<users>('http://localhost:3000/users')
  }
  private apiUrl = 'http://localhost:3000/users?id=1';


  getUsers(): Observable<users> {
    return this.http.get<users>(this.apiUrl);
  }
}


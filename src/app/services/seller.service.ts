import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerloggedIn = new BehaviorSubject<boolean>(false)
  isloginError= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {

        console.warn('result', result);
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        }

      });

  }
  reloadseller() {
    if (localStorage.getItem('seller')) {
      this.isSellerloggedIn.next(true);
      this.router.navigate(['seller-home'])

    }
  }
  userLogin(data:login){
    console.warn(data)
    this.http.get<signUp[]>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      if(result && result.body?.length){
        this.isloginError.emit(false)
        localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
      }else{
        this.isloginError.emit(true)
      }
    })
  }
}

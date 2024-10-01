import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService, private router:Router){}
  showLogin=false;
  authError:string='';
  ngOnInit(): void { 
   this.seller.reloadseller()
  }
  signUp(data:signUp): void {
    console.warn(data);
   this.seller.userSignUp(data)
  }
  login(data:login): void {
    this.authError="";
    this.seller.userLogin(data);
    this.seller.isloginError.subscribe((result)=>{
      if (result){
        this.authError="Email or Password is not correct"
      }

  });
     }
  openLogin(){
    this.showLogin=true

  }
  openSignup(){
    this.showLogin=false
  }

}

import { Component } from '@angular/core';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-doc-appointment',
  templateUrl: './doc-appointment.component.html',
  styleUrls: ['./doc-appointment.component.css']
})
export class DocAppointmentComponent {
  productdata:undefined|product;
  productQuantity:number=1;
  removeCart=false;
  cartData: product | undefined;

constructor(private product:ProductService){}
  AddToCart(){
    if(this.productdata){
      this.productdata.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
        this.removeCart=true
        this.product.localAddToCart(this.productdata);
      }else{
        let user=localStorage.getItem('user');
        let userId=user && JSON.parse(user).id
        let cartData:cart={
          ...this.productdata,
          userId,
          productId:this.productdata.id
        }
        delete cartData.id;
        this.product.addCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId);
            this.removeCart=true
          }
        })
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cartData:cart[]|undefined
  priceSummary:priceSummary={
    quantity:0,
    price:0,
    discount:0,
    tax:0,
    delivary:0,
    total:0,
    discountedprice:0
}
  constructor( private product:ProductService,private router:Router ){}

  ngOnInit(): void {
     this.loadDetails()
  }
  loadDetails(){
    this.product.currentCart().subscribe((result)=>{
      this.cartData=result
      let price=0
      let quantity=1
      result.forEach((item)=>{
        if(item.quantity){
          price=price+(+item.price*+item?.quantity)
        }
      })
      this.priceSummary.price=price
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivary=100;
      this.priceSummary.total=this.priceSummary.price-this.priceSummary.discount+this.priceSummary.tax+this.priceSummary.delivary;
      console.warn(this.priceSummary);
      if(!this.cartData.length){
        this.router.navigate(['/home'])
      }
    })
  }
checkout(){
  this.router.navigate(['/checkout']);
}
RemoveToCart(cartId:number|undefined){
  cartId && this.cartData && this.product.removeToCart(cartId)
      .subscribe((result)=>{
        this.loadDetails()
          
            })
    }
}


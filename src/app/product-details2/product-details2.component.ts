import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import { FormControl } from '@angular/forms';
declare var Razorpay: any;

@Component({
  selector: 'app-product-details2',
  templateUrl: './product-details2.component.html',
  styleUrls: ['./product-details2.component.css']
})
export class ProductDetails2Component {
  productdata:undefined|product;
  productQuantity:number=1;
  removeCart=false;
  removeCartData:product|undefined;
  cartData: product | undefined;
  trendyProducts: undefined | product[]

  constructor(private activeRoute:ActivatedRoute,private product:ProductService, private router:Router){}
  ngOnInit(): void {
    let productId=this.activeRoute.snapshot.paramMap.get('productId')
      productId && this.product.getProduct(productId).subscribe((result)=>{
        this.productdata=result;
        let cartData=localStorage.getItem('localCart');
        if(productId && cartData){
          let items=JSON.parse(cartData);
          items=items.filter((item:product)=>productId==item.id.toString())
          if(items.length){
            this.removeCart=true;
          }else{
            this.removeCart=false;
          }
        }
        let user=localStorage.getItem('user');
        if(user){
        let userId=user && JSON.parse(user).id
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result)=>{
        let item=  result.filter((item:product)=>productId?.toString()===item.productId?.toString)
        if(item.length){
          this.cartData=item[0]
          this.removeCart=true;
        }
        })

        }
      })

      this.product.trendyProducts().subscribe((data) => {
        this.trendyProducts = data;
      })
  }
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1
    }
  }
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
  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId)
    }else{
      
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        let user=localStorage.getItem('user');
      let userId=user && JSON.parse(user).id
          this.product.getCartList(userId)
          
                 })
    }
    this.removeCart=false;
  }
  rateingcount=0
  totalrating=0
  Finalrating:any;
  ratingcontrol= new FormControl(0);
  getrateing(){
this.rateingcount++;
this.totalrating +=this.ratingcontrol?.value || 0 
 this.Finalrating=(this.totalrating/this.rateingcount).toFixed(2) 
  }
  refreshPage() {
    location.reload();


  }

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100000,
      name: 'keshavraj pore',
      key: 'rzp_test_qJsTfnTv37reOx',
      image: 'https://i.ibb.co/x7xJTNJ/Screenshot-2023-09-12-18-27-18-17-6012fa4d4ddec268fc5c7112cbb265e7-1.jpg',
      prefill: {
        name: 'keshavraj ganesh pore',
        email: 'poreg79@gmail.com',
        phone: '7378564044'
      },
      theme: {
        color: 'rgb(171, 226, 43)'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  }
}

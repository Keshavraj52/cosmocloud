import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';
declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  totalPrice:number|undefined
  cartData:cart[]|undefined
  ordermsg:string|undefined
  constructor(private product:ProductService, private router:Router){}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      this.cartData=result
      let price=0
      result.forEach((item)=>{
        if(item.quantity){
          price=price+(+item.price*+item?.quantity)
        }
      })
      this.totalPrice=price+(price/10)+100-(price/10)
      console.warn(this.totalPrice);
    })
  }
  orderNow(data:{email:string,address:string,contact:string})
    {
       let user =localStorage.getItem('user')
       let userId=user && JSON.parse(user).id;
       if(this.totalPrice){
        let orderData:order={
          ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
        }
        this.cartData?.forEach((item)=>{
          setTimeout(()=>{
           item.id && this.product.deleteCartItems(item.id)
          },800)
        })
        this.product.orderNow(orderData).subscribe((result)=>{
          if(result){
            this.ordermsg="your order has been placed";
            setTimeout(()=>{
              this.router.navigate(['/myorders'])
              this.ordermsg=undefined
            },4000)
          }
        }) 
       }
      
  }
  payNowk(): void {
    if (this.totalPrice) {
        const totalPriceInPaisa = this.totalPrice * 100; 
        const RozarpayOptions = {
            description: 'Sample Razorpay demo',
            currency: 'INR',
            amount: totalPriceInPaisa,
            name: 'keshavraj pore',
            key: 'rzp_test_qJsTfnTv37reOx', 
            image: 'https://i.ibb.co/x7xJTNJ/Screenshot-2023-09-12-18-27-18-17-6012fa4d4ddec268fc5c7112cbb265e7-1.jpg', // Replace with your logo URL
            prefill: {
                name: 'keshavraj ganesh pore',
                email: 'poreg79@gmail.com',
                phone: '7378564044'
            },
            theme: {
                color: 'rgb(171, 226, 43)'
            },
            modal: {
                ondismiss: () => {
                    console.log('Payment dismissed');
                }
            }
        };

        const rzp = new Razorpay(RozarpayOptions);
        rzp.open();
    } else {
        console.error('Total price is not available.');
    }
}
}

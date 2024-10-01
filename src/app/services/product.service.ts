import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { application, appointment, cart, doctorappointment, order, photo, product, skinapplication } from '../data-type';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData=new EventEmitter<product[]|[]>() 
  doctData=new EventEmitter<doctorappointment[]|[]>() 

  constructor(private http:HttpClient) { }
  addproduct(data:product){
   return this.http.post('http://localhost:3000/product',data)
  }
  application(data:application){
    return this.http.post('http://localhost:3000/application',data)
   }
   doctorappointment(data:doctorappointment){
    return this.http.post('http://localhost:3000/doctorappointment',data)
   }
    skinapplication(data:skinapplication){
    return this.http.post(' http://localhost:3000/skinapplication',data)
   }
   earapplication(data:skinapplication){
    return this.http.post(' http://localhost:3000/earapplication',data)
   }
   hairapplication(data:skinapplication){
    return this.http.post(' http://localhost:3000/hairapplication',data)
   }
  addphoto(data:photo){
    return this.http.post('http://localhost:3000/photo',data)
   }
  productList(){
    return this.http.get<product[]>('http://localhost:3000/product');
  }
  deleteProduct(id:number){
   return this.http.delete(`http://localhost:3000/product/${id}`)
  }
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/product/${id}`)
  }
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/product/${product.id}`,product)

  }
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/product?_limit=7');
  }
  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/product?_limit=8');
  }
  discounted(){
    return this.http.get<product[]>('http://localhost:3000/product?_limit=8');
  }
  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/product?q=${query}`);
  }
  localAddToCart(data:product){
    let cartData=[];
    let localCart=localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data])

    }else{
      cartData=JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData)
    }
    this.cartData.emit(cartData)
  }
  removeItemFromCart(productId:number){
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items=items.filter((item:product)=>productId!==item.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items)
    }
  }
  addCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData);
  }
  getdoc(doctData:appointment){
    return this.http.post('http://localhost:3000/docappo',doctData);
  }
  getCartList(userId:number){
    return this.http.get<product[]>('http://localhost:3000/cart?userId=3'+userId,{observe:'response'})
    .subscribe((result)=>{
      if(result && result.body){      
                  this.cartData.emit(result.body)
                }
    })
  }
  getAppointments(userId:number){
    return this.http.get<doctorappointment[]>('http://localhost:3000/doctorappointment?userId=3'+userId,{observe:'response'})
    .subscribe((result)=>{
      if(result && result.body){      
                  this.doctData.emit(result.body)
                }
    })
  }
  removeToCart(cartId:number){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
    
  }
  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData =userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id);
  }
  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data)
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    let userData =userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id)

  }
  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    })

  }
  cancelOrder(orderId:number){
   return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
}

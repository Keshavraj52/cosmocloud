import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { product } from '../data-type';

@Component({
  selector: 'app-additional-discount',
  templateUrl: './additional-discount.component.html',
  styleUrls: ['./additional-discount.component.css']
})
export class AdditionalDiscountComponent {
  popularproducts: undefined | product[]
  trendyProducts: undefined | product[]
  discounted:undefined|product[]
 
  constructor(private product: ProductService,private user:UserService) { }
  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.popularproducts = data;
    })
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    })
    this.product.discounted().subscribe((data)=>{
      this.discounted=data.reverse();
    })
  }
}

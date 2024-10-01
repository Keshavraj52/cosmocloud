import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, product, users } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
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

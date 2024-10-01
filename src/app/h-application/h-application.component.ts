import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { application } from '../data-type';

@Component({
  selector: 'app-h-application',
  templateUrl: './h-application.component.html',
  styleUrls: ['./h-application.component.css']
})
export class HApplicationComponent {
  addProductMessage:string|undefined;
  constructor(private product:ProductService){

  }
  submit(data:application){
    this.product.application(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addProductMessage="medicine is successfully added"
      }
      setTimeout(() => (this.addProductMessage=undefined),3000 );

    })
  }
}

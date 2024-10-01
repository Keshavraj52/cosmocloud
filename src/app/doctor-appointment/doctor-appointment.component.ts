import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { application, doctorappointment } from '../data-type';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent {
  addProductMessage:string|undefined;
  constructor(private product:ProductService){

  }
  submit(data:doctorappointment){
    this.product.doctorappointment(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addProductMessage="appontment is successfully added you get call from doctor regarding it"
      }
      setTimeout(() => (this.addProductMessage=undefined),3000 );

    })
  }
  
}

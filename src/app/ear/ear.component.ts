import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { photo, skinapplication } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-ear',
  templateUrl: './ear.component.html',
  styleUrls: ['./ear.component.css']
})
export class EarComponent {
  @ViewChild('webcam') webcam: any;

  public showWebcam = true;
  public allowCameraSwitch = true;
  public errors: WebcamInitError[] = [];

  public trigger: Subject<void> = new Subject<void>();

  constructor(private http:HttpClient,private product:ProductService) {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.allowCameraSwitch = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
  addProductMessage:string|undefined;

  public handleImage(webcamImage: WebcamImage): void {
    // Handle the captured image here
    console.info('received webcam image', webcamImage);
    
    // Convert the image to JSON format
    const imageJSON = JSON.stringify(webcamImage);
    const imageData = webcamImage.imageAsDataUrl.split(',')[1]; // Extract Base64 part
    const formData = new FormData();
    formData.append('imageFile', imageData);

    // Now you can store the imageJSON in a JSON file or send it to your backend
    this.http.post<photo>(' http://localhost:3000/ear', imageJSON)
      .subscribe(
        (result) => {
          console.log('Image sent to server:', result);
          if(result){
            this.addProductMessage="image is successfully added to ear care AI"
          }
          setTimeout(() => (this.addProductMessage=undefined),3000 );
          
          // Optionally, you can do something with the server response here
        },
        error => {
          console.error('Error sending image to server:', error);
        }
      );
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

 
  submit(data:skinapplication){
    this.product.earapplication(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addProductMessage="skin application submitted successfully"
      }
      setTimeout(() => (this.addProductMessage=undefined),3000 );

    })
  }


}
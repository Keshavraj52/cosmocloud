import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-deta',
  templateUrl: './image-deta.component.html',
  styleUrls: ['./image-deta.component.css']
})
export class ImageDetaComponent {
  selectedImage!: File;

  constructor(private image: ImageService) {}

  onFileSelected(event:any): void {
    this.selectedImage = event.target.files[0];
  }

  assessVegetableQuality(): void {
    if (!this.selectedImage) {
      console.log('Please select a vegetable image.');
      return;
    }

    this.image.assessVegetableQuality(this.selectedImage).subscribe(
      (result:any) => {
        console.log('Vegetable quality assessment result:', result);
      },
      (error:any) => {
        console.error('Error assessing vegetable quality:', error);
      }
    );
  }
}

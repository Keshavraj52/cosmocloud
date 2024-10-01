import { Component } from '@angular/core';
import { FlaskService } from '../flask.service';

@Component({
  selector: 'app-flask-api',
  templateUrl: './flask-api.component.html',
  styleUrls: ['./flask-api.component.css']
})
export class FlaskApiComponent {
  selectedFile: File |null=null;
  resultImage: any;
  distance: any;

  constructor(private flaskService: FlaskService) { }

  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.flaskService.detectBall(this.selectedFile).subscribe(data => {
        this.resultImage = data.result_image;
        this.distance = data.distance;
      });
    } else {
      console.log('No file selected');
    }
  }
}

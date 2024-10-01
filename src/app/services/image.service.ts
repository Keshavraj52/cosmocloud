import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private baseUrl = 'http://your-server-endpoint/api'; // replace with your server URL

  constructor(private http: HttpClient) {}

  assessVegetableQuality(image: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', image);

    return this.http.post<string>(`${this.baseUrl}/assess-vegetable-quality`, formData);
  }
}

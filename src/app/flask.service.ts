import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  private apiUrl = 'http://127.0.0.1:5000/detect_ball'; // Replace this with your Flask API URL

  constructor(private http: HttpClient) { }

  detectBall(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>(`${this.apiUrl}/detect_ball`, formData);
  }
}

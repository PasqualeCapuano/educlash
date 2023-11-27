import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'https://api.pexels.com/v1/curated/'; // Updated API URL

  constructor(private http: HttpClient) { }

  getVideos(query: string): Observable<any> {
    const headers = { Authorization: 'piJBFBmlVPzcKe6VY43bsWlOqJ7M58uTEpCNmhBmHVWa48o96ChjR0jG' }; // Replace with environment variable
    return this.http.get(this.apiUrl, { headers });
  }
}

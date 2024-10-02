import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GnomesService {
  constructor(private readonly http: HttpClient) {
  }

  getGnomeData(): Observable<any> {
    // const headers =
    //   new HttpHeaders()
    //     .set('content-encoding', 'gzip')
    //     .set('content-type', 'application/json')
    //     .set('Access-Control-Allow-Origin', '*')
    //     .set('Access-Control-Allow-Headers', 'Content-Type',)
    //     .set('Accept', 'application/json');

    // return this.http.get<any[]>('/api/data', { headers });
    return this.http.get<any>('/api/gnomes');
  }
}

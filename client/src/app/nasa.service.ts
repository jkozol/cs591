import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

export interface Nasa {
  url: string,
  description: string,
  author: string
}

@Injectable()
export class NasaService {
  constructor(private http: HttpClient) {}

  public getNasaPic(): Observable<any> {
    return this.http.get('http://localhost:3000/api/nasa/getPic');
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HotelDto } from '../dto/hotel-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

   private baseUrl = `${environment.apiUrl}/hotel`;

  constructor(private http: HttpClient) { }

   getAllHotels(): Observable<HotelDto[]> {
    return this.http.get<HotelDto[]>(this.baseUrl);
  }

}

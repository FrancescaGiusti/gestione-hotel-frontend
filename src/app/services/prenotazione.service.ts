import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PrenotazioneDto } from '../dto/prenotazione-dto';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

   private baseUrl = `${environment.apiUrl}/prenotazione`;
  constructor(private http: HttpClient) { }

  addPrenotazione(p: PrenotazioneDto) {
    return this.http.post<void>(this.baseUrl, p);
  }
}

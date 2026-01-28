import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CameraDto } from '../dto/camera-dto';
import { CameraPatchDto } from '../dto/camera-patch-dto';
import { TipoCamera } from '../dto/tipo-camera';
import { HttpParams } from '@angular/common/http';
import { CameraFiltroDto } from '../dto/camera-filtro-dto';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private baseUrl = `${environment.apiUrl}/camera`;

  constructor(private http: HttpClient) {}

  getCamere(): Observable<CameraDto[]> {
  return this.http.get<CameraDto[]>(this.baseUrl);
  }

  addCamera(camera: CameraDto): Observable<void> {
    return this.http.post<void>(this.baseUrl, camera);
  }

  updateCamera(camera: CameraDto): Observable<void> {
    return this.http.put<void>(this.baseUrl, camera);
  }

  deleteCamera(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  modifyPartiallyCamera(id: number, camera: CameraPatchDto): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}`, camera);
  }

  getCameraByTipo(tipo: TipoCamera): Observable<CameraDto[]> {
    const params = new HttpParams().set('tipoCamera', tipo);
  return this.http.get<CameraDto[]>(this.baseUrl, { params });
  }

  getCamerePaged(page: number, size: number): Observable<CameraDto[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<CameraDto[]>(`${this.baseUrl}/page`, { params });
  }
  
  getCamereConFiltro(filtro: CameraFiltroDto, page: number, size: number): Observable<CameraDto[]> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size);

    Object.entries(filtro).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params = params.set(key, value as any);
    }
    });

  return this.http.get<CameraDto[]>(`${this.baseUrl}/filtro`, { params });
  }

  getCameraById(id: number): Observable<CameraDto> {
  return this.http.get<CameraDto>(`${this.baseUrl}/${id}`);
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CameraDto } from '../../dto/camera-dto';
import { CameraService } from '../../services/camera.service';
import { CameraFiltroDto } from '../../dto/camera-filtro-dto';
import { TipoCamera } from '../../dto/tipo-camera';
import { CameraPatchDto } from '../../dto/camera-patch-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { PrenotazioneDto } from '../../dto/prenotazione-dto';

@Component({
  selector: 'app-camera-list',
  imports: [CommonModule],
  templateUrl: './camera-list.component.html',
  styleUrl: './camera-list.component.scss'
})
export class CameraListComponent implements OnInit {

  camere: CameraDto[] = [];
  loading = false;
  error = false;

  filtro: CameraFiltroDto = {};
  page: number = 0;
  size: number = 10;


  constructor(private cameraService: CameraService,private router: Router, private route: ActivatedRoute, private prenotazioneService: PrenotazioneService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    const hotelId = params['hotelId'];
    if (hotelId) {
      this.caricaCamere(hotelId ? +hotelId : undefined);
    }
  });
  }

  caricaCamere(hotelId?: number): void {
    this.loading = true; 
    this.error = false;

    this.cameraService.getCamere(hotelId).subscribe({
      next: (data) => {
        this.camere = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  caricaCamereConFiltro(): void {
    this.loading = true;
    this.error = false;

    this.cameraService.getCamereConFiltro(this.filtro, this.page, this.size).subscribe({
      next: (data) => {
        this.camere = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.loading = false;
      }
    });
  }

   nextPage(): void {
    this.page++;
    this.caricaCamereConFiltro();
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.caricaCamereConFiltro();
    }
  }

  aggiungiCamera(camera: CameraDto): void {
    this.cameraService.addCamera(camera).subscribe({
      next: () => this.caricaCamere(),
      error: (err) => console.error(err)
    });
  }

  aggiornaCamera(camera: CameraDto): void {
    if (camera.id === undefined) return;
    this.cameraService.updateCamera(camera).subscribe({
      next: () => this.caricaCamere(),
      error: (err) => console.error(err)
    });
  }

  cancellaCamera(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID della camera non definito');
      return;
    }
    this.cameraService.deleteCamera(id).subscribe({
      next: () => this.caricaCamere(),
      error: (err) => console.error(err)
    });
  }

  modificaParzialeCamera(id: number | undefined, patch: CameraPatchDto): void {
    if (id === undefined) {
      console.error('ID della camera non definito');
      return;
    }
    this.cameraService.modifyPartiallyCamera(id, patch).subscribe({
      next: () => this.caricaCamere(),
      error: (err) => console.error(err)
    });
  }

  filtraPerTipo(tipo: string): void {
    if (!tipo) {
    this.caricaCamere();
    return;
  }
  const tipoEnum = tipo as TipoCamera;

  this.cameraService.getCameraByTipo(tipoEnum).subscribe({
    next: (data) => this.camere = data,
    error: (err) => console.error(err)
  });
  }

  vaiAModifica(id: number) {
  this.router.navigate(['/logged/camere/modifica', id]);
  }

  prenota(camera: CameraDto) {
    this.router.navigate(['/logged/prenotazioni/nuova'],
    { queryParams: { cameraId: camera.id } });
  }

}

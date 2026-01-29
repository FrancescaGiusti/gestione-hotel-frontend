import { Component, OnInit } from '@angular/core';
import { PrenotazioneDto } from '../../dto/prenotazione-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-prenotazione-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './prenotazione-form.component.html',
  styleUrl: './prenotazione-form.component.scss'
})
export class PrenotazioneFormComponent implements OnInit{
  
  cameraId!: number;

  prenotazione: PrenotazioneDto = {
    dataInizioSoggiorno: '',
    dataFineSoggiorno: ''
  };

  today: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private prenotazioneService: PrenotazioneService,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.cameraId = +this.route.snapshot.queryParamMap.get('cameraId')!; 

    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

 
salva() {
  this.errorMessage = '';

    if (!this.prenotazione.dataInizioSoggiorno || !this.prenotazione.dataFineSoggiorno) {
      this.errorMessage = 'Inserisci entrambe le date';
      return;
    }

    if (this.prenotazione.dataFineSoggiorno <= this.prenotazione.dataInizioSoggiorno) {
      this.errorMessage = 'La data di fine deve essere successiva alla data di inizio';
      return;
    }

   
    this.prenotazione.camera = { id: this.cameraId } as any; 

    this.prenotazioneService.addPrenotazione(this.prenotazione)
      .subscribe({
        next: () => {
          this.router.navigate(['/logged/camere']);
        },
        error: (err) => {
          console.error(err);
          if (err.status === 400) {
            this.errorMessage = err.error?.message || 'Errore nella prenotazione';
          } else if (err.status === 401) {
            this.errorMessage = 'Utente non autenticato';
          } else {
            this.errorMessage = 'Errore sconosciuto';
          }
        }
      });
  }
}

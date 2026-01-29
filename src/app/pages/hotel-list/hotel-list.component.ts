import { Component, OnInit } from '@angular/core';
import { HotelDto } from '../../dto/hotel-dto';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-list',
  imports: [CommonModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent implements OnInit{

  hotels: HotelDto[] = [];
  loading = true;
  error: string | null = null;

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (res) => {
        this.hotels = res;
        this.loading = false;
      }, 
      error: () => {
        this.error = "Errore nel caricamento degli hotel";
        this.loading = false;
      }
    });
  }

  vaiAlleCamere(hotelId: number) {
    this.router.navigate(['/logged/camere'], { queryParams: { hotelId } });
  }

}

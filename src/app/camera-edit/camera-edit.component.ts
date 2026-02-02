import { Component, OnInit } from '@angular/core';
import { CameraDto } from '../dto/camera-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CameraService } from '../services/camera.service';
import { FormsModule} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-camera-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './camera-edit.component.html',
  styleUrl: './camera-edit.component.scss'
})
export class CameraEditComponent implements OnInit{
  camera!: CameraDto;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private cameraService: CameraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.caricaCamera(id);
  }

  caricaCamera(id: number) {
    this.cameraService.getCameraById(id).subscribe({
      next: (camera) => {
        this.camera = camera;
        console.log(this.camera);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

confermaModifica() {
  this.cameraService.updateCamera(this.camera)
    .subscribe({
      next: () => {
        this.router.navigate(['logged/camere'], {queryParams : {hotelId: this.camera.hotel?.id}});
      }
    });
}

annulla() {
  this.router.navigate(['logged/camere'], { queryParams: {hotelId: this.camera.hotel?.id}});
}

}

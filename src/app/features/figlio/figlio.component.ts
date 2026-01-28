import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyService } from '../../services/my.service';

@Component({
  selector: 'app-figlio',
  imports: [],
  templateUrl: './figlio.component.html',
  styleUrl: './figlio.component.scss'
})
export class FiglioComponent {

  @Input() miaProprieta = "";
  @Output() currentCount = new EventEmitter<number>();

  constructor(private readonly myservice: MyService){
    this.myservice.test();
  }

  aggiornaConteggio(): void {
   this.currentCount.emit(1);
  }
}

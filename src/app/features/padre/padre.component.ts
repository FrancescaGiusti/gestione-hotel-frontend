import { Component, OnInit } from '@angular/core';
import { FiglioComponent } from "../figlio/figlio.component";
import { FormsModule } from "@angular/forms";
import { MyService } from '../../services/my.service';

@Component({
  selector: 'app-padre',
  imports: [FiglioComponent, FormsModule],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.scss'
})
export class PadreComponent implements OnInit{

  nome = "Francesco"

  count:number = 0;

  constructor(private readonly myservice: MyService){}

  ngOnInit(): void {
    this.myservice.test();
  }

  incrementa() {
    this.count ++;
  }


}

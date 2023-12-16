import { Component } from '@angular/core';
import { PrintService } from '../appServices/print.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private printService: PrintService,
    ) {}

    printer(){
      
    }


}

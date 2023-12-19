import { Component } from '@angular/core';
import { PrintService } from '../appServices/print.service';
import { PrintEpsonService } from '../appServices/print-epson.service';
declare var epson: any; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private printService: PrintService,
    private printEpsonService: PrintEpsonService,
    ) {}
    
    
  printEpson() {
    this.printEpsonService.connectToPrinter();
  }
  
  print() {
    this.printService.connectToPrinter();
  }


}

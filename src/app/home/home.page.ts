import { Component } from '@angular/core';
import { PrintService } from '../appServices/print.service';
import { PrintEpsonService } from '../appServices/print-epson.service';
declare var epson: any; 

declare var externalProperty: any;
declare var externalFunction: any;
declare var externalObject: any;

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
  
  printImage() {
    const imagePath = 'assets/images/reciept.png';
    this.printService.printImage(imagePath);
  }



  printer(){
    const printer = new epson.ePOSDevice();
    console.log('printer=> ',printer) 
    console.log('epson=> ',epson) 
  }

  externalProperty(){
    console.log('externalProperty=> ',externalProperty) 
  }
  externalFunction(){
    console.log('externalFunction=> ',externalFunction) 
  }

  externalObject(){
    console.log('externalObject=> ',externalObject) 
  }


}

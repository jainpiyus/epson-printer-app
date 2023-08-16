import { Component } from '@angular/core';
import { PrintService } from '../appServices/print.service';
import { PrintEpsonService } from '../appServices/print-epson.service';
import { UsbPrintService } from '../appServices/usbprint.service';
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
    private usbPrintService: UsbPrintService,
    ) {}

  printEpson() {
    this.printEpsonService.connectToPrinter();
  }
  
  printImage() {
    const imagePath = 'assets/images/reciept.png';
    this.printService.printImage(imagePath);
  }
  printImageWithUsb() {
    const imagePath = 'assets/images/reciept.png';
    this.usbPrintService.printImage(imagePath);
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

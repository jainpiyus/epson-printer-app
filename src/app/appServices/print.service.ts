import { Injectable } from '@angular/core';
declare var epson: any; 

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor() {}

  printImage(imagePath: string) {
    // Initialize the Epson ePOS SDK and configure printer settings
    const ePosDev = new epson.ePOSDevice();
    
    // Callback function for connection
    const callback_connect = (result: string) => {
      if (result === 'OK') {
        console.log('Connected to the printer');
        
        // Send print commands to the printer
        const printer = ePosDev.createDevice();
        printer.addText('Printing from Ionic Angular');
        printer.addImage(imagePath, 0, 0, 384, 240, 0);

        // Perform actual printing
        printer.send();
      } else {
        console.error('Error connecting to the printer:', result);
      }
    };

    // Connect to the printer
    ePosDev.connect('192.168.192.168', '8008', callback_connect);
  }


}

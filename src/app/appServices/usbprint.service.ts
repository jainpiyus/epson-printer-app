import { Injectable } from '@angular/core';
declare var epson: any; 

@Injectable({
  providedIn: 'root',
})
export class UsbPrintService {
  constructor() {}

  printImage(imagePath: string) {
    // Initialize the Epson ePOS SDK and configure printer settings
    const ePosDev = new epson.ePOSDevice();
    
    // Callback function for connection
    const callback_connect = (result: string) => {
      if (result === 'OK' || result === 'SSL_CONNECT_OK') {
        console.log('Connected to the printer');
        
        // Get the Printer object using TYPE_SIMPLE_SERIAL
        ePosDev.createDevice('local_printer', ePosDev.DEVICE_TYPE_PRINTER, { type: ePosDev.TYPE_SIMPLE_SERIAL }, (printer: any, retcode: string) => {
          if (retcode === 'OK') {
            // Set printer properties and print
            printer.timeout = 60000;
            
            // Add print commands to the printer
            printer.addText('Printing from Ionic Angular');
            printer.addImage(imagePath, 0, 0, 384, 240, 0);

            // Perform actual printing
            printer.send();
          } else {
            console.error('Error creating device:', retcode);
          }
        });
      } else {
        console.error('Error connecting to the printer:', result);
      }
    };

    // Connect to the printer using USB communication
    ePosDev.connect('usb://', '0', callback_connect);
  }


}

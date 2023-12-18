import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var epson: any; 

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor(private http: HttpClient) {}

  api:string = 'https://us-central1-mctastio.cloudfunctions.net/api/printer/printReceipt';
  // api:string = 'http://localhost:5001/mctastio/us-central1/api/printer/printReceipt';
  // api2:string = 'http://127.0.0.1:5001/mctastio/us-central1/test';

  printReceipt() {
    const inputData = {
      title: 'Hello World!',
      date: '07-08-2021',
      // Add any other data you need for the receipt
    };
    this.http.post(this.api, inputData).subscribe(
      (response) => {
        console.log('Receipt printed successfully');
      },
      (error) => {
        console.error('Error printing receipt:', error);
      }
    );
  }

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

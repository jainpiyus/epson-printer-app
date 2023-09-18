import { Injectable } from '@angular/core';
import { BluetoothSerialOriginal } from '@ionic-native/bluetooth-serial';
// import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
declare var epson: any; 

@Injectable({
  providedIn: 'root',
})
export class BluetoothPrintService {
  constructor( 
      // private bluetoothSerial: BluetoothSerial,
      private bluetoothSerial: BluetoothSerialOriginal
    ) {}

  bluetoothPrint(imagePath: string) {
    this.bluetoothSerial.discoverUnpaired().then((devices) => {
      // Find your printer in the list of discovered devices
      const printer = devices.find((device) => device.name === 'YourPrinterName');
    
      if (printer) {
        // Connect to the printer
        this.bluetoothSerial.connect(printer.address).subscribe(
          (success) => {
            console.log('Connected to printer:', success);
          },
          (error) => {
            console.error('Error connecting to printer:', error);
          }
        );
      } else {
        console.error('Printer not found in discovered devices.');
      }
    });
  }


}

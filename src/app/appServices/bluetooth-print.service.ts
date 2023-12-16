import { Injectable } from '@angular/core';
// import { BluetoothSerialOriginal } from '@ionic-native/bluetooth-serial';
// import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
declare var epson: any; 

@Injectable({
  providedIn: 'root',
})
export class BluetoothPrintService {
  constructor( 
      // private bluetoothSerial: BluetoothSerial,
      // private bluetoothSerial: BluetoothSerialOriginal
    ) {}


    async printImageWithBluetooth(imagePath: string) {
      // Initialize the Epson ePOS SDK and configure printer settings
      const ePosDev = new epson.ePOSDevice();
  
      const bluetoothAddress = '00:01:90:77:4E:11';
      
      // Callback function for connection
      const callback_connect = (result: string) => {
        console.log('result: ', result);
        if (result === 'OK' || result === 'SSL_CONNECT_OK') {
          console.log('Connected to the printer');
          
          // Get the Printer object using TYPE_BLUETOOTH
          ePosDev.createDevice('local_printer', ePosDev.DEVICE_TYPE_PRINTER, { type: ePosDev.TYPE_BLUETOOTH, target: bluetoothAddress }, (printer: any, retcode: string) => {
            console.log('printer=> ', printer);
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
  
      // Connect to the Bluetooth printer using the correct URL format
      ePosDev.connect('bth://', '', callback_connect);
    }

  // bluetoothPrint(imagePath: string) {
  //   this.bluetoothSerial.discoverUnpaired().then((devices) => {
  //     // Find your printer in the list of discovered devices
  //     const printer = devices.find((device) => device.name === 'YourPrinterName');
    
  //     if (printer) {
  //       // Connect to the printer
  //       this.bluetoothSerial.connect(printer.address).subscribe(
  //         (success) => {
  //           console.log('Connected to printer:', success);
  //         },
  //         (error) => {
  //           console.error('Error connecting to printer:', error);
  //         }
  //       );
  //     } else {
  //       console.error('Printer not found in discovered devices.');
  //     }
  //   });
  // }


}

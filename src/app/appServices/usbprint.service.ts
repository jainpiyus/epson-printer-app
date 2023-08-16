import { Injectable } from '@angular/core';
declare var epson: any; 
const usb = (navigator as any).usb;
 


@Injectable({
  providedIn: 'root',
})
export class UsbPrintService {
  constructor() {}
  connectedDevices: any[] = [];

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

  async getConnectedUsbSerialList() {
    try {
      const device = await usb.requestDevice({ filters: [] });
      console.log('USB Device:', device);
      this.connectedDevices.push(device);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  getConnectedUsbSerialList2() {
    // Initialize the Epson ePOS SDK
    const ePosDev = new epson.ePOSDevice();

    // Callback function for discovery
    const callback_discover = (result: string, devices: any[]) => {
      if (result === 'OK') {
        console.log('USB Serial Devices:');
        devices.forEach((device) => {
          console.log('Device Name:', device.deviceName);
          console.log('Device Type:', device.deviceType);
          console.log('Device Connection Type:', device.connectionType);
          console.log('--------------------');
        });
      } else {
        console.error('Device discovery error:', result);
      }
    };

    // Perform USB device discovery
    ePosDev.discover(callback_discover);
  }


}

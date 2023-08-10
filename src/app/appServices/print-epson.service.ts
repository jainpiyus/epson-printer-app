import { Injectable } from '@angular/core';
declare var epson: any;

@Injectable({
  providedIn: 'root',
})
export class PrintEpsonService {
  private ePosDev: any; // Declare the ePosDev object
  private printer: any = null; // Declare the printer object

  constructor() {
    // Initialize the ePosDev object
    this.ePosDev = new epson.ePOSDevice();
  }

  connectToPrinter() {
    // Connect to the device
    this.ePosDev.connect('192.168.192.168', '8008', (resultConnect: string) => {
      this.callbackConnect(resultConnect);
      debugger
    });
  }

  private callbackConnect(resultConnect: string) {
    if (resultConnect === 'OK' || resultConnect === 'SSL_CONNECT_OK') {
      // Get the Printer object
      this.ePosDev.createDevice(
        'local_printer',
        this.ePosDev.DEVICE_TYPE_PRINTER,
        { crypto: false, buffer: false },
        (deviceObj: any, retcode: string) => {
          this.callbackCreateDevice(deviceObj, retcode);
        }
      );
    } else {
      // Display the error message
      console.error('Connection error:', resultConnect);
    }
  }

  private callbackCreateDevice(deviceObj: any, retcode: string) {
    if (retcode === 'OK') {
      this.printer = deviceObj;
      this.printer.timeout = 60000;

      // Register the printing complete event
      this.printer.onreceive = (res: any) => {
        console.log('Print result:', res.success);
      };

      this.print();
    } else {
      console.error('Error creating device:', retcode);
    }
  }

  private print() {
    // Create the printing data
    this.printer.addText('Hello\n');

    // Send the printing data
    this.printer.send();
  }

  disconnectFromPrinter() {
    // Discard the Printer object
    this.ePosDev.deleteDevice(this.printer, (errorCode: any) => {
      this.callbackDeleteDevice(errorCode);
    });
  }

  private callbackDeleteDevice(errorCode: any) {
    // Disconnect from the device
    this.ePosDev.disconnect();
  }
}


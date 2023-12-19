import { Injectable } from '@angular/core';

declare var epson: any;

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private ePosDev: any;
  private printer: any = null;

  constructor() {
    this.ePosDev = new epson.ePOSDevice();
  }

  connectToPrinter() {
    this.ePosDev.connect('192.168.0.106', '9100', (resultConnect: string) => {
      this.callbackConnect(resultConnect);
    });
  }

  private callbackConnect(resultConnect: string) {
    if (resultConnect === 'OK' || resultConnect === 'SSL_CONNECT_OK') {
      this.ePosDev.createDevice(
        'local_printer',
        this.ePosDev.DEVICE_TYPE_PRINTER,
        { crypto: false, buffer: false },
        (deviceObj: any, retcode: string) => {
          this.callbackCreateDevice(deviceObj, retcode);
        }
      );
    } else {
      console.error('Connection error:', resultConnect);
    }
  }

  private callbackCreateDevice(deviceObj: any, retcode: string) {
    if (retcode === 'OK') {
      this.printer = deviceObj;
      this.printer.timeout = 60000;

      this.printer.onreceive = (res: any) => {
        console.log('Print result:', res.success);
        // You can handle printing completion here
        this.disconnectFromPrinter();
      };

      this.print();
    } else {
      console.error('Error creating device:', retcode);
    }
  }

  private print() {
    // Example: Adding text to the printer
    this.printer.addText('Hello, Printer!');

    // Send the printing data
    this.printer.send();
  }

  disconnectFromPrinter() {
    this.ePosDev.disconnect();
  }
}

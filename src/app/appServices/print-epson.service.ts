import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var epson: any;

@Injectable({
  providedIn: 'root',
})
export class PrintEpsonService {
  private ePosDev: any; // Declare the ePosDev object
  private printer: any = null; // Declare the printer object

  connected:boolean = false;
  connecting:boolean = false;
  printerlogs = new Subject<string>();


  constructor() {
    // Initialize the ePosDev object
    this.ePosDev = new epson.ePOSDevice();
  }

  consolelog(log){
    console.log('PrintLogs: ', log)
    this.printerlogs.next(log);
  }

  connectToPrinter(ip:string) {
    this.connecting = true;
    this.consolelog('Connecting to printer...')
    this.ePosDev.connect(ip, '9100', (resultConnect: string) => {
      this.callbackConnect(resultConnect);
    });
  }

  private callbackConnect(resultConnect: string) {
    if (resultConnect === 'OK' || resultConnect === 'SSL_CONNECT_OK') {
      // Get the Printer object
      this.consolelog("connected to ePOS Device Service Interface.");
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
      this.connecting = false;
			this.consolelog("connected to ePOS Device Service Interface is failed. [" + resultConnect + "]");
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
			  this.consolelog('Print' + (res.success ? 'Success' : 'Failure') + '\nCode:' + res.code + '\nBattery:' + res.battery + '\n');
      };
      this.connected = true;
      this.connecting = false;
      this.consolelog("you can use printer.");
    } else {
      this.connecting = false;
      this.consolelog('Error creating device: '+ retcode)
      console.error('Error creating device:', retcode);
    }
  }

  print() {
    if(!this.connected) return;

    this.printer.addLayout(this.printer.LAYOUT_RECEIPT, 800, 0, 0, 0, 35, 0);
    this.printer.addTextAlign(this.printer.ALIGN_CENTER);
    this.printer.addTextSmooth(true);
    this.printer.addText('\n');
    this.printer.addText('\n');

    this.printer.addTextDouble(true, true);
    this.printer.addText('Tastio' + '\n');

    this.printer.addTextDouble(false, false);
    this.printer.addText('Tasio' + '\n');
    this.printer.addText('\n');

    this.printer.addTextAlign(this.printer.ALIGN_LEFT);
    this.printer.addText('DATE: ' + '07:55 pm' + '\t\t');

    this.printer.addTextAlign(this.printer.ALIGN_RIGHT);
    this.printer.addText('TIME: ' + '07:55 pm' + '\n');

    this.printer.addTextAlign(this.printer.ALIGN_LEFT);

    this.printer.addTextAlign(this.printer.ALIGN_RIGHT);
    this.printer.addText('REGISTER: ' + 'Anup' + '\n');
    this.printer.addTextAlign(this.printer.ALIGN_LEFT);
    this.printer.addText('SALE # ' + 95959 + '\n');

    this.printer.addTextAlign(this.printer.ALIGN_CENTER);
    this.printer.addTextStyle(false, false, true, this.printer.COLOR_1);
    this.printer.addTextStyle(false, false, false, this.printer.COLOR_1);
    this.printer.addTextDouble(false, true);
    this.printer.addText('* SALE RECEIPT *\n');
    this.printer.addTextDouble(false, false);
    
    this.printer.addText('****************\n');
    this.printer.addText('\n');
    this.printer.addText('\n');
    this.printer.addBarcode('12345', this.printer.BARCODE_CODE39, this.printer.HRI_NONE, this.printer.FONT_A, 2, 32);

    this.printer.addText('\n');
    this.printer.addText('\n');
    this.printer.addCut(this.ePosDev.CUT_FEED);
    // Send the printing data
    this.printer.send();

    // const htmlContent = `<html><table><tr><td style="max-width:180px"> Burrito of Carne Asada</td><td align="right">+$0</td></tr></table></html>`;

    // // Process the HTML content
    // const processedHtml = this.htmlToEscPos(htmlContent);

    // // Print the processed content
    // this.printer.addText(processedHtml);
    // this.printer.send();
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


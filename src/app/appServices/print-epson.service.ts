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


  // 
  ESC = String.fromCharCode(27);

  // Function to convert HTML text to ESC/POS text
  htmlToEscPos(htmlText: string): string {
    // Replace or process HTML-specific elements
    const processedText = htmlText
      .replace(/<\/?strong>/g, this.ESC + '|bC') // Bold text
      .replace(/<br>/g, this.ESC + '|1lF') // Line feed
    // Add more replacements as needed

    return processedText;
  }

  // Function to convert HTML table to ESC/POS commands
  htmlTableToEscPos(htmlTable: string): string {
    // Replace or process table-specific elements
    const processedTable = htmlTable
      .replace(/<\/?table>/g, '') // Remove table tags
      .replace(/<\/?tr>/g, this.ESC + '|1lF') // Line feed for each row
      .replace(/<\/?td>/g, this.ESC + '|1lF') // Line feed for each cell
    // Add more replacements as needed

    return processedTable;
  }

  // 
  // connectToPrinter(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     // Connect to the device
  //     this.ePosDev.connect('192.168.0.106', '9100', (resultConnect: string) => {
  //       if (resultConnect === 'OK' || resultConnect === 'SSL_CONNECT_OK') {
  //         // Connection successful, resolve the Promise
  //         this.callbackConnect(resultConnect);
  //         resolve();
  //       } else {
  //         // Connection error, reject the Promise
  //         console.error('Connection error:', resultConnect);
  //         reject(new Error('Connection error'));
  //       }
  //     });
  //   });
  // }

  connectToPrinter() {
    // Connect to the device
    this.ePosDev.connect('192.168.0.106', '9100', (resultConnect: string) => {
      this.callbackConnect(resultConnect);
      // debugger
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
    // this.printer.addText('Hello');
    // const htmlContent = '<html><body><h1>Hello, Printer Anup!</h1></body></html>';
    // this.printer.addText(htmlContent, { type: 'html' });

    // // Send a line feed and cut the paper
    // this.printer.addText('Hello\n');
    // this.printer.addCommand('\x1B' + 'd' + '\x09'); // ESC d 9 (cut)


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


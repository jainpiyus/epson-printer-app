import { Component, OnInit } from '@angular/core';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper'

@Component({
  selector: 'app-zebra',
  templateUrl: './zebra.page.html',
  styleUrls: ['./zebra.page.scss'],
})
export class ZebraPage implements OnInit {
  ZebraBrowserPrintWrapper = require('zebra-browser-print-wrapper');

  constructor() { }

  ngOnInit() {
  }

  printBarcode = async (serial: any) => {
    try {
      // Create a new instance of the object
      const browserPrint = new ZebraBrowserPrintWrapper();

      // Select default printer
      const defaultPrinter = await browserPrint.getDefaultPrinter();

      // Set the printer
      browserPrint.setPrinter(defaultPrinter);

      // Check printer status
      const printerStatus = await browserPrint.checkPrinterStatus();

      // Check if the printer is ready
      if (printerStatus.isReadyToPrint) {

        // ZPL script to print a simple barcode
        const zpl = `^XA
                        ^BY2,2,100
                        ^FO20,20^BC^FD${serial}^FS
                        ^XZ`;

        browserPrint.print(zpl);
      } else {
        console.log("Error/s", printerStatus.errors);
      }

    } catch (error: any) {
      throw new Error(error);
    }
  };

}

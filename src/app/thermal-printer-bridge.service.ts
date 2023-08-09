import { Injectable } from '@angular/core';
declare var cordova: any;

@Injectable({
  providedIn: 'root',
})
export class ThermalPrinterBridgeService {
  constructor() {}

  print(text: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.printer) {
        cordova.plugins.printer.print(
          text,
          { name: 'Document.html', duplex: 'long' },
          () => {
            console.log('Print success');
            resolve();
          },
          (error: any) => {
            console.error('Print failed:', error);
            reject(error);
          }
        );
      } else {
        reject(new Error('Cordova Printer plugin is not available.'));
      }
    });
  }
}




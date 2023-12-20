import { Injectable } from '@angular/core';
import { ThermalPrinter, printer, types } from '@pillowstudio/node-thermal-printer';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private printer: printer;

  constructor() {
    this.printer = new ThermalPrinter({
      type: types.EPSON, // Adjust the printer type as needed
      interface: 'tcp://192.168.0.106:9100', // Replace with your printer's IP address and port
      options: {
        timeout: 5000,
      },
    });

    this.printer.setCharacterSet('');
  }

  printText(text: string) {
    this.printer.setTextSize(1, 1);
    this.printer.text(text);
  }

  cutPaper() {
    this.printer.cut();
  }

  async executePrintJob() {
    try {
      await this.printer.execute();
    } catch (error) {
      console.error('Printing error:', error);
    }
  }
}

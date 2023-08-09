import { Component } from '@angular/core';
import { ThermalPrinterBridgeService } from './thermal-printer-bridge.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private thermalPrinterBridgeService: ThermalPrinterBridgeService) { }


  // print() {
  //   console.log(this.ThermalPrinter);
  //   this.ThermalPrinter.listPrinters({ type: 'usb' }, function (printers) {
  //     if (printers.length > 0) {
  //       var printer: any = printers[0];
  //       this.ThermalPrinter.requestPermissions(printer, function () {
  //         // Permission granted - We can print!
  //         this.ThermalPrinter.printFormattedText({
  //           type: 'usb',
  //           id: printer.id,
  //           text: '[C]<u><font>Hello World</font></u>' // new lines with "\n"
  //         }, function () {
  //           console.log('Successfully printed!');
  //         }, function (error) {
  //           console.error('Printing error', error);
  //         });
  //       }, function (error) {
  //         console.error('Permission denied - We can\'t print!');
  //       });
  //     } else {
  //       console.error('No printers found!');
  //     }
  //   }, function (error) {
  //     console.error('Ups, we cant list the printers!', error);
  //   });
  // }



  async print() {
    try {
      await this.thermalPrinterBridgeService.print('Hello, this is a test print!');
    } catch (error) {
      console.error('Printing error:', error);
    }
  }
}

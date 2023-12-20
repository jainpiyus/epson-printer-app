import { Component } from '@angular/core';
import { PrintService } from '../appServices/print.service';
import { PrintEpsonService } from '../appServices/print-epson.service';
declare var epson: any; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  get connected(){
    return this.printEpsonService.connected;
  }
  get connecting(){
    return this.printEpsonService.connecting;
  };
  printerlogs:string[]=[];

  selectedIpPrinter:string = '192.168.0.106'; // i.e. '192.168.1.40'
  isIpValid: boolean = true;

  constructor(
    private printService: PrintService,
    private printEpsonService: PrintEpsonService,
    ) {
      this.subscribePrintLogs();
    }
    


  subscribePrintLogs(){
    this.printEpsonService.printerlogs.subscribe(res=>{
      this.printerlogs.push(res);
      console.log('local printerlogs',this.printerlogs)
    })
  }
    
  onInputIpField() {
    const ipPattern = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/;
    this.isIpValid = ipPattern.test(this.selectedIpPrinter);
  }

  connect() {
    this.printEpsonService.connectToPrinter(this.selectedIpPrinter);
  }

  printEpson() {
    this.printEpsonService.print();
  }
  

}

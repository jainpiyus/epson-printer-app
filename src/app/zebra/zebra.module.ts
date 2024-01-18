import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZebraPageRoutingModule } from './zebra-routing.module';

import { ZebraPage } from './zebra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZebraPageRoutingModule
  ],
  declarations: [ZebraPage]
})
export class ZebraPageModule {}

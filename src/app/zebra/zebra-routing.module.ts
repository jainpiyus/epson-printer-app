import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZebraPage } from './zebra.page';

const routes: Routes = [
  {
    path: '',
    component: ZebraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZebraPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelAccountTransfersPage } from './sel-account-transfers.page';

const routes: Routes = [
  {
    path: '',
    component: SelAccountTransfersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelAccountTransfersPageRoutingModule {}

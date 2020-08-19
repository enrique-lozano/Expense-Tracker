import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelAccountPage } from './sel-account.page';

const routes: Routes = [
  {
    path: '',
    component: SelAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelAccountPageRoutingModule {}

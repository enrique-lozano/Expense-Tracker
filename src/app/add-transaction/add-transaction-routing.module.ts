import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTransactionPage } from './add-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: AddTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTransactionPageRoutingModule {}

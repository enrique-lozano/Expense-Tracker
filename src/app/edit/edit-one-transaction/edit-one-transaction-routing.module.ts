import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOneTransactionPage } from './edit-one-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: EditOneTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOneTransactionPageRoutingModule {}

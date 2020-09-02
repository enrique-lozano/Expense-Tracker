import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAccountsPage } from './edit-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: EditAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAccountsPageRoutingModule {}

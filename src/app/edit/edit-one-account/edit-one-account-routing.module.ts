import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOneAccountPage } from './edit-one-account.page';

const routes: Routes = [
  {
    path: '',
    component: EditOneAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOneAccountPageRoutingModule {}

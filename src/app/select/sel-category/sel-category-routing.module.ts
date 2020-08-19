import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelCategoryPage } from './sel-category.page';

const routes: Routes = [
  {
    path: '',
    component: SelCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelCategoryPageRoutingModule {}

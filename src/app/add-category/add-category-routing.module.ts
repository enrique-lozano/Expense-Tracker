import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCategoryPage } from './add-category.page';

const routes: Routes = [
  {
    path: '',
    component: AddCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCategoryPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOneCategoryPage } from './edit-one-category.page';

const routes: Routes = [
  {
    path: '',
    component: EditOneCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOneCategoryPageRoutingModule {}

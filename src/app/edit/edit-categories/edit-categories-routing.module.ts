import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCategoriesPage } from './edit-categories.page';

const routes: Routes = [
  {
    path: '',
    component: EditCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCategoriesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnualCategoriesPage } from './anual-categories.page';

const routes: Routes = [
  {
    path: '',
    component: AnualCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnualCategoriesPageRoutingModule {}

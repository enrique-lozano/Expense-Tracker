import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensualCategoriesPage } from './mensual-categories.page';

const routes: Routes = [
  {
    path: '',
    component: MensualCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensualCategoriesPageRoutingModule {}

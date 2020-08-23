import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelCategoryExpensesPage } from './sel-category-expenses.page';

const routes: Routes = [
  {
    path: '',
    component: SelCategoryExpensesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelCategoryExpensesPageRoutingModule {}

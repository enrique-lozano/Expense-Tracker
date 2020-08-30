import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnualExpenseIncomePage } from './anual-expense-income.page';

const routes: Routes = [
  {
    path: '',
    component: AnualExpenseIncomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnualExpenseIncomePageRoutingModule {}

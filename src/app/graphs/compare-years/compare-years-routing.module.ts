import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompareYearsPage } from './compare-years.page';

const routes: Routes = [
  {
    path: '',
    component: CompareYearsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareYearsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelCategoryExpensesPageRoutingModule } from './sel-category-expenses-routing.module';

import { SelCategoryExpensesPage } from './sel-category-expenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelCategoryExpensesPageRoutingModule
  ],
  declarations: [SelCategoryExpensesPage]
})
export class SelCategoryExpensesPageModule {}

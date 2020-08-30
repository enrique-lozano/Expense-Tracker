import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnualExpenseIncomePageRoutingModule } from './anual-expense-income-routing.module';

import { AnualExpenseIncomePage } from './anual-expense-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnualExpenseIncomePageRoutingModule
  ],
  declarations: [AnualExpenseIncomePage]
})
export class AnualExpenseIncomePageModule {}

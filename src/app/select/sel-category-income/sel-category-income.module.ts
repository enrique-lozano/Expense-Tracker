import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelCategoryIncomePageRoutingModule } from './sel-category-income-routing.module';

import { SelCategoryIncomePage } from './sel-category-income.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelCategoryIncomePageRoutingModule
  ],
  declarations: [SelCategoryIncomePage]
})
export class SelCategoryIncomePageModule {}

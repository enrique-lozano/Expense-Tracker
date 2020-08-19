import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelCategoryPageRoutingModule } from './sel-category-routing.module';

import { SelCategoryPage } from './sel-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelCategoryPageRoutingModule
  ],
  declarations: [SelCategoryPage]
})
export class SelCategoryPageModule {}

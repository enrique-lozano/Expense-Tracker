import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnualCategoriesPageRoutingModule } from './anual-categories-routing.module';

import { AnualCategoriesPage } from './anual-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnualCategoriesPageRoutingModule
  ],
  declarations: [AnualCategoriesPage]
})
export class AnualCategoriesPageModule {}

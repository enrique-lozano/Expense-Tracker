import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensualCategoriesPageRoutingModule } from './mensual-categories-routing.module';

import { MensualCategoriesPage } from './mensual-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensualCategoriesPageRoutingModule
  ],
  declarations: [MensualCategoriesPage]
})
export class MensualCategoriesPageModule {}

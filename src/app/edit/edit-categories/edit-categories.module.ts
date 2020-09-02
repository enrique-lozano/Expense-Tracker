import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCategoriesPageRoutingModule } from './edit-categories-routing.module';

import { EditCategoriesPage } from './edit-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCategoriesPageRoutingModule
  ],
  declarations: [EditCategoriesPage]
})
export class EditCategoriesPageModule {}

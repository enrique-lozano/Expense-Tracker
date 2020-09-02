import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOneCategoryPageRoutingModule } from './edit-one-category-routing.module';

import { EditOneCategoryPage } from './edit-one-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOneCategoryPageRoutingModule
  ],
  declarations: [EditOneCategoryPage]
})
export class EditOneCategoryPageModule {}

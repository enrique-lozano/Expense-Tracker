import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompareYearsPageRoutingModule } from './compare-years-routing.module';

import { CompareYearsPage } from './compare-years.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompareYearsPageRoutingModule
  ],
  declarations: [CompareYearsPage]
})
export class CompareYearsPageModule {}

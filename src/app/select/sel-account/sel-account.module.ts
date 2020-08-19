import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelAccountPageRoutingModule } from './sel-account-routing.module';

import { SelAccountPage } from './sel-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelAccountPageRoutingModule
  ],
  declarations: [SelAccountPage]
})
export class SelAccountPageModule {}

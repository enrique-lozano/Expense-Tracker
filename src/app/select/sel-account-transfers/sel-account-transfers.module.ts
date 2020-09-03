import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelAccountTransfersPageRoutingModule } from './sel-account-transfers-routing.module';

import { SelAccountTransfersPage } from './sel-account-transfers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelAccountTransfersPageRoutingModule
  ],
  declarations: [SelAccountTransfersPage]
})
export class SelAccountTransfersPageModule {}

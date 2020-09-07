import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOneTransactionPageRoutingModule } from './edit-one-transaction-routing.module';

import { EditOneTransactionPage } from './edit-one-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOneTransactionPageRoutingModule
  ],
  declarations: [EditOneTransactionPage]
})
export class EditOneTransactionPageModule {}

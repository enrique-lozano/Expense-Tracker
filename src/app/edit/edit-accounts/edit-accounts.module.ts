import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountsPageRoutingModule } from './edit-accounts-routing.module';

import { EditAccountsPage } from './edit-accounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAccountsPageRoutingModule
  ],
  declarations: [EditAccountsPage]
})
export class EditAccountsPageModule {}

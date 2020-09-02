import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOneAccountPageRoutingModule } from './edit-one-account-routing.module';

import { EditOneAccountPage } from './edit-one-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOneAccountPageRoutingModule
  ],
  declarations: [EditOneAccountPage]
})
export class EditOneAccountPageModule {}

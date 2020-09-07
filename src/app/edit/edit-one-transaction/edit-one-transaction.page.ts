import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertController } from '@ionic/angular';
import { Category } from 'src/app/services/interfaces';

@Component({
  selector: 'app-edit-one-transaction',
  templateUrl: './edit-one-transaction.page.html',
  styleUrls: ['./edit-one-transaction.page.scss'],
})
export class EditOneTransactionPage implements OnInit {

  private note:string = '';
  private date:string = '';
  private value:number = 0;

  constructor(private router: Router, private service:DatabaseService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.note = this.service.transactionToEdit.note;
    this.value = this.service.transactionToEdit.value;
  }

  edit_transaction(){
    console.log(this.date);
    var trans = this.service.transactionToEdit;
    this.service.editTransaction(trans.id,this.note,this.value,this.date);
    this.go('tabs/tab1');
  }
/*
  async openAlert(){
    const alert = await this.alertCtrl.create({
      header: '¿Estas seguro?',
      message: 'Todas las transacciones de esta cuenta seran eliminadas. Esta accion no tien vuelta atrás',
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si, acepto',
          handler: data => {
            this.service.removeAccount(this.service.selectedAccount.name);
            this.go('tabs/tab1');
          }
        }
      ]
    });

    await alert.present();
  }
*/
  go(url:string){
    this.router.navigate([url]);
  }
}

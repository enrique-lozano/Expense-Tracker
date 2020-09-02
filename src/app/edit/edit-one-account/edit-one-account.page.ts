import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-one-account',
  templateUrl: './edit-one-account.page.html',
  styleUrls: ['./edit-one-account.page.scss'],
})
export class EditOneAccountPage implements OnInit {

  private balance:number = 0;
  private icon:number; //Index in the all_icons array
  private all_icons:string[];

  constructor(private router: Router, private service:DatabaseService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.all_icons=this.service.all_icons;
    this.balance = this.service.selectedAccount.balance;
    for(var i=0; i<this.all_icons.length;i++){
      if(this.all_icons[i] == this.service.selectedAccount.icon){
        this.icon = i;
      }
    }
  }

  edit_account(){
    this.service.editAccount(this.service.selectedAccount.name, this.balance, this.all_icons[this.icon]);
    this.go('tabs/tab1');
  }

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

  go(url:string){
    this.router.navigate([url]);
  }
}

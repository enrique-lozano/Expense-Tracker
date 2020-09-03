import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  constructor(private router: Router, private service:DatabaseService, public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  getCategories(){
    if(this.service.all_categories_expenses.length==0){
      this.service.getCategoriesByType("Gasto").subscribe(elem => {
        this.service.all_categories_expenses = elem;
      });  
    }
    if(this.service.all_categories_incomes.length==0){
      this.service.getCategoriesByType("Ingreso").subscribe(elem => {
        this.service.all_categories_incomes = elem;
      });  
    }
  }

  resetAll(){
    this.getCategories();
    console.log("Reseting...................");
    for(var i=0; i<this.service.all_accounts.length; i++){
      this.service.removeAccount(this.service.all_accounts[i].name);
    }
    for(var i=0; i<this.service.all_categories_expenses.length; i++){
      this.service.removeCategory(this.service.all_categories_expenses[i].name);
    }
    for(var i=0; i<this.service.all_categories_incomes.length; i++){
      this.service.removeCategory(this.service.all_categories_incomes[i].name);
    }
    this.resetAlert();
  }

  async resetAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Listo!',
      message: 'Hemos restaurado tu cuenta y borrado todos los datos de nuestra base de datos',
      buttons: [
        {
          text: 'Hecho!',
          handler: data => {
            this.go('tabs/tab1');
          }
        }
      ]
    });

    await alert.present();
  }

  async openAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Alto ahí Padawan!',
      message: 'Todas las cuentas, transacciones y categorias de esta cuenta seran eliminadas. Esta accion no tien vuelta atrás',
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
            this.resetAll();
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

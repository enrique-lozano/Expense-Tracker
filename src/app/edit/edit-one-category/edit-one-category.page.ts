import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-one-category',
  templateUrl: './edit-one-category.page.html',
  styleUrls: ['./edit-one-category.page.scss'],
})
export class EditOneCategoryPage implements OnInit {

  public type:string;
  public type2:string;
  public icon:number; //Index in the all_icons array
  public all_icons:string[];

  constructor(private router: Router, private service:DatabaseService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.all_icons=this.service.all_iconsC;
    this.all_icons.sort(this.compare);
    this.service.all_iconsC = this.all_icons;
    this.type = this.service.selectedCategory.type;
    this.type2 = this.service.selectedCategory.type2;
    for(var i=0; i<this.all_icons.length;i++){
      if(this.all_icons[i] == this.service.selectedCategory.icon){
        this.icon = i;
      }
    }
  }

  compare(a,b){
    if ( a < b ){
      return -1;
    }
    if ( a > b ){
      return 1;
    }
    return 0;
  }

  selectType(){
    console.log("Selection done");
  }


  edit_category(){
    this.service.editCategory(this.service.selectedCategory.name, this.type, this.type2, this.all_icons[this.icon]);
    this.go('tabs/tab1');
  }

  async openAlert(){
    const alert = await this.alertCtrl.create({
      header: '¿Estas seguro?',
      message: 'Todas las transacciones de esta categoría seran eliminadas. Esta accion no tien vuelta atrás',
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
            this.service.removeCategory(this.service.selectedCategory.name);
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  constructor(private router: Router, private service:DatabaseService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.setRed();
  }
  
  public selectedCategory:string = 'Seleccionar';
  public selectedAccount:string = 'Seleccionar';
  public date:string = '';
  public note:string = '';
  public type:string = '';

  ionViewDidEnter(){
    if(this.service.selectedCategory == undefined && this.service.selectedAccount == undefined){
      return;
    }if(this.service.selectedCategory != undefined && this.service.selectedAccount == undefined){
      this.selectedCategory = this.service.selectedCategory.name;
      return;
    }if(this.service.selectedCategory == undefined && this.service.selectedAccount != undefined){
      this.selectedAccount = this.service.selectedAccount.name;
      return;
    }
    this.selectedCategory = this.service.selectedCategory.name;
    this.selectedAccount = this.service.selectedAccount.name;
  }

  sign:string='-';
  value:string='0';
  buttons = [[1,2,3,'AC'],
  [4,5,6,'Cal'],
  [7,8,9,'Not'],
  ['.',0,'<-','FIN']];

  butPress(num:any){
    if(this.value=='0'){
      this.value = '';
    }

    if(num=='<-'){
      this.value = this.value.slice(0,-1);
      return;
    }
    
    if(num=='AC'){
      this.value = '0';
      document.getElementById("value").style.fontSize="128px";
    }else{
      if(this.value.length>13){
        return;
      }else{
        this.value += num;
      }
    }

    if(this.value.length>3){
      document.getElementById("value").style.fontSize="90px";
    }if(this.value.length>6){
      document.getElementById("value").style.fontSize="75px";
    }if(this.value.length>8){
      document.getElementById("value").style.fontSize="64px";
    }
  }

  createTransaction(){
    if(this.type=='Transfer'){
      return;
    }
    if(this.date==''){ //ONLY IF DATE IS NOT SELECTED BY THE USER
      var year = new Date().getFullYear();
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      this.date = year + '-' + month + '-' + date;
      if (month<10){
        this.date = year + '-0' + month + '-' + date;
      }if (date<10){
        this.date = year + '-' + month + '-0' + date;
      }if (date<10 && month<10){
        this.date = year + '-0' + month + '-0' + date;
      }
    }
    if(this.selectedAccount == 'Seleccionar' && this.service.all_accounts.length==1){
      this.selectedAccount = this.service.all_accounts[0].name;
    }else if((this.selectedAccount == 'Seleccionar' && this.service.all_accounts.length>1) || this.selectedCategory == 'Seleccionar'){
      this.openAlert();
      return;
    }
    this.service.createTransaction(this.selectedCategory,this.selectedAccount,Number(this.value), this.date, this.note);
    this.go('tabs/tab1');
  }

  setGreen(){
    this.sign='+';
    this.type='Ingreso';
    this.selectedCategory = 'Seleccionar';
    document.getElementById("top").setAttribute("class","back-green ")
  }
  setRed(){
    this.sign='-';
    this.type='Gasto';
    this.selectedCategory='Seleccionar';
    document.getElementById("top").setAttribute("class","back-red ")
  }
  setBlue(){
    this.sign='';
    this.type='Transfer';
    document.getElementById("top").setAttribute("class","back-blue ")
  }

  async openAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Selecciona una caetgoria y una cuenta antes de continuar',
      buttons: [
        {
          text: 'Acetar'
        }
      ]
    });
    await alert.present();
  }

  async openNote(){
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'note',
          placeholder: 'Nota',
        },
      ],
      header: 'Añade una nota',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.note = data.note;
          }
        }
      ]
    });

    await alert.present();
  }

  async openCalendar(){
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'date',
          placeholder: '',
          type: 'date',
        },
      ],
      header: 'Añade una fecha',
      message: 'Si no seleccionas ningún dia, tu transacción sera añadida al dia actual',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.date = data.date;
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

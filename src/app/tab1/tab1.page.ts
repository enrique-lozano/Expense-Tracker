import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DatabaseService } from '../services/database.service'
import { Account, Category, Transaction } from '../services/interfaces'
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private balance: number = 0;
  private income: number = 0;
  private expense: number = 0;
  private all_accounts: Account[];
  private all_transactions: Transaction[];
  private selected_time: string = "Mensual";
  private healthy: number = 0;

  constructor(private service:DatabaseService, private router: Router, public actionSheetController: ActionSheetController){
  }


  ngOnInit(){
    /*
    this.service.getAccount("Eyy").then((elem) => {
      console.log(elem.initial_balance);
    });
    */
   console.log("eyyy")
    if(this.service.all_accounts.length==0){
      this.service.getAccounts().subscribe(elem => {
        this.service.all_accounts = elem;
        this.all_accounts = this.service.all_accounts;
        this.getBalance();
      });  
    }else{
      this.all_accounts = this.service.all_accounts;
    }

    if(this.service.all_transactions.length==0){
      this.service.getTransactions().subscribe(elem => {
        this.service.all_transactions = elem;
        this.all_transactions = this.service.all_transactions;
        this.getIncomeAndExpense();
      });  
    }else{
      this.all_transactions = this.service.all_transactions;
    }

  }

  doRefresh(event) {
    console.log('Begin async operation refreshing...');
    /*
    this.service.createAccount("General", 1450, "wallet");
    this.service.createAccount("Inversiones", 3450, "wallet");
    this.service.createCategory("Comida", "food", "Basico", "Gasto", "Ey");
    this.service.createCategory("Restaurants", "food", "Basico", "Gasto", "Ey");
    this.service.createTransaction("Comida","General", 281,"","");
    */
   
    this.resetBalance();
    this.getIncomeAndExpense();
    this.service.getTransactions().subscribe(elem => {
      this.service.all_transactions = elem;
      this.all_transactions = this.service.all_transactions;
      this.getIncomeAndExpense();
    });  

    //-----------------------------------------------------     

    setTimeout(() => {
      console.log('Async refreshing operation has ended');
      event.target.complete();
    }, 2000);
  }

  resetBalance(){
    this.balance = 0; //Reset the number and recalculate
    this.service.getAccounts().subscribe(elem => {
      this.service.all_accounts = elem;
      this.all_accounts = this.service.all_accounts;
      for (var i = 0; i<elem.length; i++){
        this.balance = +this.balance + elem[i].balance;
      }
      this.balance = Math.round(this.balance);
    });
  }

  getBalance(){ //LOCALLY INSTEAD OF READING THE DATABASE
    this.balance = 0; //Reset the number and recalculate
    for(var i=0; i<this.all_accounts.length; i++){
      this.balance = +this.balance + this.all_accounts[i].balance;
    }
    this.balance = Math.round(this.balance);
  }

  getIncomeAndExpense(){
    var year = new Date().getFullYear();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1; 
    this.income = 0;
    this.expense = 0; 
    if(this.selected_time=="Semanal"){
      for(var i=0; i<7;i++) {
        for(var j=0; j<this.all_transactions.length; j++){
          if(this.all_transactions[j].day==(date-i) && this.all_transactions[j].month==month && this.all_transactions[j].year==year){
            if(this.all_transactions[j].category.type=="Gasto"){
              this.expense = this.expense + this.all_transactions[j].value;
            }
            if(this.all_transactions[j].category.type=="Ingreso"){
              this.income = this.income + this.all_transactions[j].value 
            }
          }
        }
      }    
    }
    if(this.selected_time=="Mensual"){ 
      for(var j=0; j<this.all_transactions.length; j++){
        if(this.all_transactions[j].month==month && this.all_transactions[j].year==year){
          if(this.all_transactions[j].category.type=="Gasto"){
            this.expense = this.expense + this.all_transactions[j].value;
          }
          if(this.all_transactions[j].category.type=="Ingreso"){
            this.income = this.income + this.all_transactions[j].value 
          }
        }
      }
    }
    if(this.selected_time=="Trimestral"){ 
      if(month<=3){
        for (var i=1; i<4; i++){
          for(var j=0; j<this.all_transactions.length; j++){
            if(this.all_transactions[j].month==i && this.all_transactions[j].year==year){
              if(this.all_transactions[j].category.type=="Gasto"){
                this.expense = this.expense + this.all_transactions[j].value;
              }
              if(this.all_transactions[j].category.type=="Ingreso"){
                this.income = this.income + this.all_transactions[j].value 
              }
            }
          }
        }

      }else if(month>3 && month<=6){
        for (var i=4; i<7; i++){
          for(var j=0; j<this.all_transactions.length; j++){
            if(this.all_transactions[j].month==i && this.all_transactions[j].year==year){
              if(this.all_transactions[j].category.type=="Gasto"){
                this.expense = this.expense + this.all_transactions[j].value;
              }
              if(this.all_transactions[j].category.type=="Ingreso"){
                this.income = this.income + this.all_transactions[j].value 
              }
            }
          }
        }
      }else if(month>6 && month<=9){
        for (var i=7; i<10; i++){
          for(var j=0; j<this.all_transactions.length; j++){
            if(this.all_transactions[j].month==i && this.all_transactions[j].year==year){
              if(this.all_transactions[j].category.type=="Gasto"){
                this.expense = this.expense + this.all_transactions[j].value;
              }
              if(this.all_transactions[j].category.type=="Ingreso"){
                this.income = this.income + this.all_transactions[j].value 
              }
            }
          }
        }
      }else if(month>9){
        for (var i=10; i<12; i++){
          for(var j=0; j<this.all_transactions.length; j++){
            if(this.all_transactions[j].month==i && this.all_transactions[j].year==year){
              if(this.all_transactions[j].category.type=="Gasto"){
                this.expense = this.expense + this.all_transactions[j].value;
              }
              if(this.all_transactions[j].category.type=="Ingreso"){
                this.income = this.income + this.all_transactions[j].value 
              }
            }
          }
        }
      }
      
    }
    if(this.selected_time=="Anual"){
      for(var j=0; j<this.all_transactions.length; j++){
        if(this.all_transactions[j].year==year){
          if(this.all_transactions[j].category.type=="Gasto"){
            this.expense = this.expense + this.all_transactions[j].value;
          }
          if(this.all_transactions[j].category.type=="Ingreso"){
            this.income = this.income + this.all_transactions[j].value 
          }
        }
      }
    }
    this.healthy = ((this.income - this.expense)/this.income)*100;
    this.healthy = Math.round(this.healthy);
    if(this.healthy<=0){
      this.healthy = 0;
      document.getElementById("healthy-value").style.color = "#FF0000";
      return;
    }else if(this.healthy<7.5){
      document.getElementById("healthy-value").style.color = "#FF3600";
      return;
    }else if(this.healthy<12.5){
      document.getElementById("healthy-value").style.color = "#FF8300";
      return;
    }else if(this.healthy<20){
      document.getElementById("healthy-value").style.color = "#FFC900";
      return;
    }else if(this.healthy<27.5){
      document.getElementById("healthy-value").style.color = "#EFE800";
      return;
    }else if(this.healthy<=35){
      document.getElementById("healthy-value").style.color = "#8BFF00";
      return;
    }else if(this.healthy>35){
      document.getElementById("healthy-value").style.color = "green";
      return;
    }
  }

  async selectTime() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Lapso temporal',
      buttons: [
        { text: 'Anual', handler: () => {          
            if(this.selected_time!="Anual"){
              this.selected_time = "Anual";
              this.getIncomeAndExpense();
            }            
          }
        },
        { text: 'Trimestral', handler: () => {
            if(this.selected_time!="Trimestral"){
              this.selected_time = "Trimestral";
              this.getIncomeAndExpense();
            }
          }
        },
        { text: 'Mensual', handler: () => {
            if(this.selected_time!="Mensual"){
              this.selected_time = "Mensual";
              this.getIncomeAndExpense();
            }
          }
        },
        { text: 'Semanal', handler: () => {
            if(this.selected_time!="Semanal"){
              this.selected_time = "Semanal";
              this.getIncomeAndExpense();
            }
          }
        },
      ]
    });

    await actionSheet.present();
  }


  go(url:string){
    this.router.navigate([url]);
  }
  
}

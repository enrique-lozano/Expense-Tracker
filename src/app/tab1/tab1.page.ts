import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DatabaseService } from '../services/database.service'
import { Account, Category } from '../services/interfaces'
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
  private selected_time: string = "Mensual";

  constructor(private service:DatabaseService, private router: Router, public actionSheetController: ActionSheetController){
  }


  ngOnInit(){
    /*
    this.service.getAccount("Eyy").then((elem) => {
      console.log(elem.initial_balance);
    });
    */
    if(this.service.all_accounts.length==0){
      this.service.getAccounts().subscribe(elem => {
        this.service.all_accounts = elem;
        this.all_accounts = this.service.all_accounts;
        this.getBalance();
        this.getIncomeAndExpense();
      });  
    }else{
      this.all_accounts = this.service.all_accounts;
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
    //this.getIncomeAndExpense();

    //-----------------------------------------------------     

    setTimeout(() => {
      console.log('Async refreshing operation has ended');
      event.target.complete();
    }, 2000);
  }

  resetBalance(){
    this.balance = 0; //Reset the number and recalculate
    this.service.getAccounts().subscribe(elem => {
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
        this.service.getTransactionsByDay(date-i, month, year).subscribe(elem => {
          for(var i=0; i<elem.length;i++){
            if(elem[i].category.type=="Gasto"){
              this.expense = this.expense + elem[i].value;
            }
            if(elem[i].category.type=="Ingreso"){
              this.income = this.income + elem[i].value 
            }
          }
        });
      }    
    }
    if(this.selected_time=="Mensual"){ 
      this.service.getTransactionsByMonth(month,year).subscribe(elem => {
        this.service.all_transactions_this_month = elem;
        for(var i=0; i<elem.length;i++){
          if(elem[i].category.type=="Gasto"){
            this.expense = this.expense + elem[i].value 
          }
          if(elem[i].category.type=="Ingreso"){
            this.income = this.income + elem[i].value 
          }
        }
      });
    }
    if(this.selected_time=="Trimestral"){ 
      if(month<=3){
        for (var i=1; i<4; i++){
          this.service.getTransactionsByMonth(i,year).subscribe(elem => {
            for(var i=0; i<elem.length;i++){
              if(elem[i].category.type=="Gasto"){
                this.expense = this.expense + elem[i].value 
              }
              if(elem[i].category.type=="Ingreso"){
                this.income = this.income + elem[i].value 
              }
            }
          });
        }

      }else if(month>3 && month<=6){
        for (var i=4; i<7; i++){
          this.service.getTransactionsByMonth(i, year).subscribe(elem => {
            for(var i=0; i<elem.length;i++){
              if(elem[i].category.type=="Gasto"){
                this.expense = this.expense + elem[i].value 
              }
              if(elem[i].category.type=="Ingreso"){
                this.income = this.income + elem[i].value 
              }
            }
          });
        }
      }else if(month>6 && month<=9){
        for (var i=7; i<10; i++){
          this.service.getTransactionsByMonth(i,year).subscribe(elem => {
            for(var i=0; i<elem.length;i++){
              if(elem[i].category.type=="Gasto"){
                this.expense = this.expense + elem[i].value 
              }
              if(elem[i].category.type=="Ingreso"){
                this.income = this.income + elem[i].value 
              }
            }
          });
        }
      }else if(month>9){
        for (var i=10; i<12; i++){
          this.service.getTransactionsByMonth(i,year).subscribe(elem => {
            for(var i=0; i<elem.length;i++){
              if(elem[i].category.type=="Gasto"){
                this.expense = this.expense + elem[i].value 
              }
              if(elem[i].category.type=="Ingreso"){
                this.income = this.income + elem[i].value 
              }
            }
          });
        }
      }
      
    }
    if(this.selected_time=="Anual"){
      this.service.getTransactionsByYear(year).subscribe(elem => {
        for(var i=0; i<elem.length;i++){
          if(elem[i].category.type=="Gasto"){
            this.expense = this.expense + elem[i].value 
          }
          if(elem[i].category.type=="Ingreso"){
            this.income = this.income + elem[i].value 
          }
        }
      });
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

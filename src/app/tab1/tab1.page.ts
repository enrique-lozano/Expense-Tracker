import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DatabaseService } from '../services/database.service'
import { Account, Category } from '../services/interfaces'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private balance: number = 0;
  private all_accounts: Account[];

  constructor(private service:DatabaseService){
  }


  ngOnInit(){
    /*
    this.service.getAccount("Eyy").then((elem) => {
      console.log(elem.initial_balance);
    });

    this.service.createAccount("Eyy", 1890, "wallet");
    this.service.removeAccount("Eyy");
    */
   /*
    this.getBalance();   
    this.service.getAccounts().subscribe(elem => {
      this.all_accounts = elem;
      console.log(this.all_accounts);
    });
    */
  }

  doRefresh(event) {
    console.log('Begin async operation refreshing...');
    /*
    this.service.createAccount("General", 1450, "wallet");
    this.service.createAccount("Inversiones", 3450, "wallet");
    this.service.createCategory("Comida", "food", "Basico", "Gasto", "Ey");
    this.service.createCategory("Restaurants", "food", "Basico", "Gasto", "Ey");
    this.service.createTransaction("Comida","General", 281);
    */    


    //-----------------------------------------------------
     
    /*
    this.service.getAccounts().subscribe(elem => {
      this.all_accounts = elem;
      console.log(this.all_accounts);
      this.getBalance();
    });*/

    setTimeout(() => {
      console.log('Async refreshing operation has ended');
      event.target.complete();
    }, 2000);
  }

  getBalance(){
    this.balance = 0; //Reset the number and recalculate
    this.service.getAccounts().subscribe(elem => {
      for (var i = 0; i<elem.length; i++){
        this.balance = +this.balance + elem[i].initial_balance;
      }
    });
  }


}

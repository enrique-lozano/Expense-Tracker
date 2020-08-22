import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Transaction } from '../services/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{

  private all_transactions: Transaction[];
  private clicked: boolean[] = [];
  constructor(private service:DatabaseService) {  }

  ngOnInit() {
    this.service.getTransactions().subscribe(elem => {
      this.all_transactions = elem;
      console.log("Transactions read. Elements:", this.all_transactions.length);
      for (var i=0; i<this.all_transactions.length; i++){
        this.clicked.push(false);
      }
    });
  }

  doClick(i:number){
    this.clicked[i] = !this.clicked[i];
  }


}

import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Transaction } from '../services/interfaces';
import {style, state, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        //style({height:"0"}),
        //animate(50, style({opacity:1, height:"auto"})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({height:"0", opacity:0})) 
      ])
    ])
  ]
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

  editTransaction(id:string){
    console.log("edit:", id)
  }

  deleteTransaction(id:string){
    this.service.removeTransaction(id);
  }



}

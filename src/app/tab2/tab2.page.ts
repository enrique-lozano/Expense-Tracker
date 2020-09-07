import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Transaction } from '../services/interfaces';
import {style, state, animate, transition, trigger} from '@angular/animations';
import { ActionSheetController, PickerController } from '@ionic/angular';
import { PickerOptions} from '@ionic/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        //style({height:"0"}),
        //animate(50, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({height:"0", opacity:0})) 
      ])
    ])
  ]
})
export class Tab2Page{

  public all_transactions: Transaction[];
  public clicked: boolean[] = []; //Array to show the option buttons in each transaction
  public income: number = 0;
  public expense: number = 0;
  public year:number;
  public month:number;
  public all_months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  public fab = true; // Fab button visible or not

  constructor(private service:DatabaseService, private router: Router, public actionSheetController: ActionSheetController, public pickerCtrl:PickerController) {  }

  ionViewDidEnter() {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.all_transactions = this.service.getTransactionsByMonth(this.month, this.year);
    this.all_transactions.sort(this.compareTime);
    this.getIncomeAndExpense();
    for (var i=0; i<this.all_transactions.length; i++){
      this.clicked.push(false);
    }
  }

  compareTime(a,b){
    if ( a.year > b.year ){
      return -1;
    }
    if ( a.year < b.year){
      return 1;
    }
    if( a.year == b.year){
      if ( a.month > b.month ){
        return -1;
      }
      if ( a.month < b.month){
        return 1;
      }
      if(a.month == b.month){
        if ( a.day > b.day ){
          return -1;
        }
        if ( a.day < b.day){
          return 1;
        }
      }
    }
    return 0;
  }

  compareCuantity(a,b){
    if ( a.value > b.value ){
      return -1;
    }
    if ( a.value < b.value){
      return 1;
    }
    return 0;
  }

  compareCategory(a,b){
    if ( a.category.name < b.category.name ){
      return -1;
    }
    if ( a.category.name > b.category.name){
      return 1;
    }
    return 0;
  }

  compareType(a,b){
    if ( a.category.type < b.category.type ){
      return -1;
    }
    if ( a.category.type > b.category.type){
      return 1;
    }
    return 0;
  }

  getIncomeAndExpense(){
    this.income=0;
    this.expense=0;
    for(var i=0; i<this.all_transactions.length; i++){
      if(this.all_transactions[i].category.type == "Gasto"){
        this.expense = this.expense + this.all_transactions[i].value;
      }
      if(this.all_transactions[i].category.type == "Ingreso"){
        this.income = this.income + this.all_transactions[i].value;
      }
    }
  }

  isItemAvailable = false;
  getItems(ev: any) {
    // Reset items back to all of the items
    this.all_transactions = this.service.getTransactionsByMonth(this.month, this.year);
    this.all_transactions.sort(this.compareTime);

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.all_transactions = this.all_transactions.filter((item) => {
            return (item.category.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
            item.note.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.isItemAvailable = false;
    }
}

  doClick(i:number){
    this.clicked[i] = !this.clicked[i];
  }

  editTransaction(transaction:Transaction){
    this.service.transactionToEdit = transaction;
    this.go('edit-one-transaction');
  }

  deleteTransaction(id:string){
    for(var i=0; i<this.clicked.length;i++){
      this.clicked[i] = false;
    }
    this.service.removeTransaction(id);
    for (var i=0; i<this.all_transactions.length; i++){
      if(id == this.all_transactions[i].id){
        this.all_transactions.splice(i,1);
      }
    }
    this.getIncomeAndExpense();
  }

  async selectOrder() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ordenar por',
      buttons: [
        { text: 'Fecha', handler: () => {          
            this.all_transactions.sort(this.compareTime);
          }
        },
        { text: 'Cuantía', handler: () => {          
            this.all_transactions.sort(this.compareCuantity);
          }
        },
        { text: 'Categoría', handler: () => {          
          this.all_transactions.sort(this.compareCategory);
          }
        },   
        { text: 'Ingreso/Gasto', handler: () => {          
          this.all_transactions.sort(this.compareType);
        }
      },
      ]
    });

    await actionSheet.present();
  }

  async selectMonth(){
    let opts:PickerOptions = {
      buttons: [
        {
          text: 'Confirmar',
          handler: (value) => {
          }
        }
      ],
      columns: [
        {
          name: 'year',
          selectedIndex: 0,
          options: [
            { text:'2020'},
            { text:'2019'},
            { text:'2018'},
          ]
        },
        {
          name: 'month',
          selectedIndex: this.month-1,
          options: [
            { text:'Enero'},
            { text:'Febrero'},
            { text:'Marzo'},
            { text:'Abril'},
            { text:'Mayo'},
            { text:'Junio'},
            { text:'Julio'},
            { text:'Agosto'},
            { text:'Septiembre'},
            { text:'Octubre'},
            { text:'Noviembre'},
            { text:'Diciembre'},
          ]
        },      
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let _month = await (await picker.getColumn('month')).selectedIndex;
      let _year = await (await picker.getColumn('year')).selectedIndex;
      /*this.service.getTransactionsByMonth(_month+1, this.year-_year).subscribe(elem => {
        this.all_transactions = elem;
        this.all_transactions.sort(this.compareTime);
        this.getIncomeAndExpense();
        for (var i=0; i<this.all_transactions.length; i++){
          this.clicked.push(false);
        }
      });*/
      this.month = _month+1;
      this.year = new Date().getFullYear() - _year
      this.all_transactions = this.service.getTransactionsByMonth(this.month, this.year);
      this.all_transactions.sort(this.compareTime);
      this.getIncomeAndExpense();
      for (var i=0; i<this.all_transactions.length; i++){
        this.clicked.push(false);
      }
    });
  }

  lastY:any;
  logScrolling(event){
    if(event.detail.scrollTop > Math.max(0,this.lastY)){
      this.fab = false;
    }else{
      this.fab = true;
    }
    this.lastY = event.detail.scrollTop;
  }

  
  go(url:string){
    this.router.navigate([url]);
  }

}

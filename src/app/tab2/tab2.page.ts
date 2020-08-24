import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Transaction } from '../services/interfaces';
import {style, state, animate, transition, trigger} from '@angular/animations';
import { ActionSheetController, PickerController } from '@ionic/angular';
import { PickerOptions} from '@ionic/core'

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
  private clicked: boolean[] = []; //Array to show the option buttons in each transaction
  private income: number = 0;
  private expense: number = 0;
  public year:number;
  public month:number;

  constructor(private service:DatabaseService, public actionSheetController: ActionSheetController, public pickerCtrl:PickerController) {  }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1; 
    if(this.service.all_transactions_this_month.length==0){
      this.service.getTransactionsByMonth(this.month, this.year).subscribe(elem => {
        this.service.all_transactions_this_month = elem;
        this.all_transactions = elem;
        this.all_transactions.sort(this.compareTime);
        this.getIncomeAndExpense();
        for (var i=0; i<this.all_transactions.length; i++){
          this.clicked.push(false);
        }
      });
    }else{
      this.all_transactions = this.service.all_transactions_this_month;
      this.getIncomeAndExpense();
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

  doClick(i:number){
    this.clicked[i] = !this.clicked[i];
  }

  editTransaction(id:string){
    console.log("edit:", id)
  }

  deleteTransaction(id:string){
    for(var i=0; i<this.clicked.length;i++){
      this.clicked[i] = false;
    }
    this.service.removeTransaction(id);
  }

  async selectOrder() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ordenar por',
      buttons: [
        { text: 'Temporalidad', handler: () => {          
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
      ]
    });

    await actionSheet.present();
  }

  async selectMonth(){
    let opts:PickerOptions = {
      buttons: [
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
      this.service.getTransactionsByMonth(_month+1, this.year-_year).subscribe(elem => {
        this.all_transactions = elem;
        this.all_transactions.sort(this.compareTime);
        this.getIncomeAndExpense();
        for (var i=0; i<this.all_transactions.length; i++){
          this.clicked.push(false);
        }
      });
    });
  }

}

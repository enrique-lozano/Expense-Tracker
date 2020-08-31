import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Transaction } from 'src/app/services/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { BoundElementProperty } from '@angular/compiler';

@Component({
  selector: 'app-anual-expense-income',
  templateUrl: './anual-expense-income.page.html',
  styleUrls: ['./anual-expense-income.page.scss'],
})
export class AnualExpenseIncomePage {

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;
  private all_transactions: Transaction[];
  private data_income: number[] = [];
  private data_expense: number[] = [];
  private selected_year: number;

  constructor(private service:DatabaseService) { }

  ionViewDidEnter() {
    this.selected_year = new Date().getFullYear();
    if(this.service.all_transactions.length==0){
      this.service.getTransactions().subscribe(elem => {
        this.service.all_transactions = elem;
        this.all_transactions = this.service.all_transactions;
        this.getMonthsData(this.all_transactions);
        this.createBarChart();
      });  
    }else{
      this.all_transactions = this.service.all_transactions;
      this.getMonthsData(this.all_transactions);
      this.createBarChart();
    }

  }

  createBarChart() {
    let ctx = this.barChart.nativeElement;
    ctx.height = 450;
    this.bars = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['EN', 'FE', 'MA', 'AB', 'MY', 'JN', 'JL', 'AG', 'SE', 'OC', 'NO','DI'],
        datasets: [{
          label: 'Income',
          data: this.data_income,
          backgroundColor: '#2ECC71', // array should have same number of elements as number of dataset
          borderColor: '#2ECC71',// array should have same number of elements as number of dataset
          borderWidth: 1
        },{
          label: 'Expense',
          data: this.data_expense,
          backgroundColor: '#E74C3C', // array should have same number of elements as number of dataset
          borderColor: '#E74C3C',// array should have same number of elements as number of dataset
          borderWidth: 1
        }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
            ticks: {
              fontSize: 14
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
              stacked: true,
              ticks: {
                fontSize: 14
              }
          }]
        },
        legend: {
          labels: {
            fontSize: 20,
          }
        }
      }
    });
  }

  getMonthsData(transactions: Transaction[]){
    for(var month=1;month<=12;month++){
      var month_data_income = 0;
      var month_data_expense = 0;
      for (var i=0; i<transactions.length; i++){
        if(transactions[i].month==month && transactions[i].year==this.selected_year){
          if(transactions[i].category.type=="Ingreso"){
            month_data_income = month_data_income + transactions[i].value;
          }
          if(transactions[i].category.type=="Gasto"){
            month_data_expense = month_data_expense - transactions[i].value;
          }
        }
      }
      this.data_income.push(month_data_income);
      this.data_expense.push(month_data_expense);
    }
  }

  addYear(){
    this.data_income = [];
    this.data_expense = [];
    this.selected_year = this.selected_year + 1;
    this.getMonthsData(this.all_transactions);
    this.bars.data.datasets[0].data = this.data_income;
    this.bars.data.datasets[1].data = this.data_expense;  
    this.bars.update();
  }
  reduceYear(){
    this.data_income = [];
    this.data_expense = [];
    this.selected_year = this.selected_year - 1;
    this.getMonthsData(this.all_transactions);
    this.bars.data.datasets[0].data = this.data_income;
    this.bars.data.datasets[1].data = this.data_expense;  
    this.bars.update();
  }

}

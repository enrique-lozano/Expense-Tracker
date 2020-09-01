import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction, Category } from 'src/app/services/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-anual-categories',
  templateUrl: './anual-categories.page.html',
  styleUrls: ['./anual-categories.page.scss'],
})
export class AnualCategoriesPage {

  @ViewChild('barChart') barChart;

  bars: any;
  private all_transactions: Transaction[] = [];
  private all_categories_income: Category[] = [];
  private all_categories_expense: Category[] = [];
  private data: number[] = [];
  private selected_year: number;
  private selected_category: string;
  private selected_icon: string;
  private type = "expense";
  private barColor = '#FF1B00';

  constructor(private service:DatabaseService) { }

  ionViewDidEnter() {
    this.selected_year = new Date().getFullYear();
    if(this.service.all_transactions.length==0){
      this.service.getTransactions().subscribe(async elem => {
        this.service.all_transactions = elem;
        this.all_transactions = this.service.all_transactions;
        this.getCategoriesExpense();       
      });  
    }else{
      this.all_transactions = this.service.all_transactions;
      this.getCategoriesExpense();       
    }

  }

  getCategoriesExpense(){
    if(this.service.all_categories_expenses.length==0){
      this.service.getCategoriesByType("Gasto").subscribe(elem => {
        this.service.all_categories_expenses = elem;
        this.all_categories_expense = this.service.all_categories_expenses;
        this.selected_category = this.all_categories_expense[0].name;
        this.selected_icon = this.all_categories_expense[0].icon;
        this.getCategoriesIncome();
        this.createBarChart();
      });  
    }else{
      this.all_categories_expense = this.service.all_categories_expenses;
      this.selected_category = this.all_categories_expense[0].name;
      this.selected_icon = this.all_categories_expense[0].icon;
      this.getCategoriesIncome();
      this.createBarChart();
    }
  }

  getCategoriesIncome(){
    this.getMonthsData(this.all_transactions);
    if(this.service.all_categories_incomes.length==0){
      this.service.getCategoriesByType("Ingreso").subscribe(elem => {
        this.service.all_categories_incomes = elem;
        this.all_categories_income = this.service.all_categories_incomes;
      });  
    }else{
      this.all_categories_income = this.service.all_categories_incomes;
    }
  }

  getMonthsData(transactions: Transaction[]){
    this.data = [];
    for(var month=1;month<=12;month++){
      var month_data = 0;
      for (var i=0; i<transactions.length; i++){
        if(transactions[i].month==month && transactions[i].year==this.selected_year){
          if(transactions[i].category.name==this.selected_category){
            month_data = month_data + transactions[i].value;
          }
        }
      }
      this.data.push(month_data);
    }
  }

  createBarChart() {
    let ctx = this.barChart.nativeElement;
    ctx.height = 300;
    this.bars = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['EN', 'FE', 'MA', 'AB', 'MY', 'JN', 'JL', 'AG', 'SE', 'OC', 'NO','DI'],
        datasets: [{
          data: this.data,
          backgroundColor: this.barColor, 
          borderColor: this.barColor,
          borderWidth: 1
        },
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
          display: false
        },
        tooltips: {
            enabled: false
        }
      }
    });
  }

  optionsFn(){
    if(this.type=="income"){
      this.selected_category = this.all_categories_income[0].name;
      this.barColor = '#0DDB26';
    }
    if(this.type=="expense"){
      this.selected_category = this.all_categories_expense[0].name;
      this.barColor = '#FF1B00';
    }
    this.getMonthsData(this.all_transactions);
    this.bars.data.datasets[0].backgroundColor = this.barColor; 
    this.bars.data.datasets[0].borderColor = this.barColor; 
    this.bars.data.datasets[0].data = this.data; 
    this.bars.update();
  }

  addYear(){
    this.selected_year = this.selected_year + 1;
    this.getMonthsData(this.all_transactions);
    this.bars.data.datasets[0].data = this.data; 
    this.bars.update();
  }
  reduceYear(){
    this.selected_year = this.selected_year - 1;
    this.getMonthsData(this.all_transactions);
    this.bars.data.datasets[0].data = this.data
    this.bars.update();
  }

}

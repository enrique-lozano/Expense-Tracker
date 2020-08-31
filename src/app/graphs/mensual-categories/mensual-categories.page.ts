import { Component, OnInit, ViewChild } from '@angular/core';
import { Transaction, Category } from 'src/app/services/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-mensual-categories',
  templateUrl: './mensual-categories.page.html',
  styleUrls: ['./mensual-categories.page.scss'],
})
export class MensualCategoriesPage {

  @ViewChild('barChart') barChart;

  bars: any;
  private all_transactions: Transaction[] = [];
  private all_categories_income: Category[] = [];
  private all_categories_expense: Category[] = [];
  private data: number[] = [];
  private selected_month: number;
  private selected_year: number;
  private months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octumbre","Noviembre","Diciembre"]
  private labels = [];
  private colors = [];
  private type = "expense";

  constructor(private service:DatabaseService) { }

  ionViewDidEnter() {
    this.selected_month = new Date().getMonth() + 1;
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
        this.fillLabelsAndData(this.all_categories_expense);
        this.getCategoriesIncome();
        this.createBarChart();
      });  
    }else{
      this.all_categories_expense = this.service.all_categories_expenses;
      this.fillLabelsAndData(this.all_categories_expense);
      this.getCategoriesIncome();
      this.createBarChart();
    }
  }

  getCategoriesIncome(){
    if(this.service.all_categories_incomes.length==0){
      this.service.getCategoriesByType("Ingreso").subscribe(elem => {
        this.service.all_categories_incomes = elem;
        this.all_categories_income = this.service.all_categories_incomes;
      });  
    }else{
      this.all_categories_income = this.service.all_categories_incomes;
    }
  }

  fillLabelsAndData(categories: Category[]){
    this.labels = [];
    this.colors = [];
    this.data = [];
    for(var i=0; i<categories.length; i++){
      this.labels.push(categories[i].name);
      this.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      var category_data = 0;
      for(var j=0; j<this.all_transactions.length; j++){
        if(this.all_transactions[j].month==this.selected_month && this.all_transactions[j].year==this.selected_year){
          if(this.all_transactions[j].category.name == categories[i].name){
            category_data = category_data + this.all_transactions[j].value;
          }
        }  
      }
      this.data.push(category_data);
    }
  }


  createBarChart() {
    let ctx = this.barChart.nativeElement;
    ctx.height = 350;
    this.bars = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Income',
          data: this.data,
          backgroundColor: this.colors, 
          borderWidth: 3
        }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
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

  optionsFn(){
    if(this.type=="income"){
      this.fillLabelsAndData(this.all_categories_income);
    }if(this.type=="expense"){
      this.fillLabelsAndData(this.all_categories_expense);
    }
    this.bars.data.datasets[0].data = this.data; 
    this.bars.data.datasets[0].backgroundColor = this.colors; 
    this.bars.data.labels = this.labels;
    this.bars.update();
  }

  addYear(){
    this.selected_year = this.selected_year + 1;
    if(this.type=="income"){
      this.fillLabelsAndData(this.all_categories_income);
    }if(this.type=="expense"){
      this.fillLabelsAndData(this.all_categories_expense);
    }
    this.bars.data.datasets[0].data = this.data; 
    this.bars.update();
  }
  reduceYear(){
    this.selected_year = this.selected_year - 1;
    if(this.type=="income"){
      this.fillLabelsAndData(this.all_categories_income);
    }if(this.type=="expense"){
      this.fillLabelsAndData(this.all_categories_expense);
    }
    this.bars.data.datasets[0].data = this.data
    this.bars.update();
  }
  addMonth(){
    this.selected_month = this.selected_month + 1;
    if(this.selected_month>12){
      this.selected_month = 1;
    }
    if(this.type=="income"){
      this.fillLabelsAndData(this.all_categories_income);
    }if(this.type=="expense"){
      this.fillLabelsAndData(this.all_categories_expense);
    }
    this.bars.data.datasets[0].data = this.data; 
    this.bars.update();
  }
  reduceMonth(){
    this.selected_month = this.selected_month - 1;
    if(this.selected_month==0){
      this.selected_month = 12;
    }
    if(this.type=="income"){
      this.fillLabelsAndData(this.all_categories_income);
    }if(this.type=="expense"){
      this.fillLabelsAndData(this.all_categories_expense);
    }
    this.bars.data.datasets[0].data = this.data
    this.bars.update();
  }

}

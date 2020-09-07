import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Transaction } from 'src/app/services/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { BoundElementProperty } from '@angular/compiler';

@Component({
  selector: 'app-compare-years',
  templateUrl: './compare-years.page.html',
  styleUrls: ['./compare-years.page.scss'],
})
export class CompareYearsPage {
  
  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: string[] = ['#FF0000','#FF8F00','#F7FF00'];
  private all_transactions: Transaction[];
  private data_this_year: number[] = [];
  private data_prev_year: number[] = [];
  private data_prev2_year: number[] = [];
  private selected_year: number;
  private type = "expense";

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
    ctx.height = 400;
    this.bars = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['EN', 'FE', 'MA', 'AB', 'MY', 'JN', 'JL', 'AG', 'SE', 'OC', 'NO','DI'],
        datasets: [{
          label: this.selected_year,
          data: this.data_this_year,
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: this.colorArray[0],// array should have same number of elements as number of dataset
          borderWidth: 3,
        },{
          label: this.selected_year-1,
          data: this.data_prev_year,
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: this.colorArray[1],// array should have same number of elements as number of dataset
          borderWidth: 3
        },{
          label: this.selected_year-2,
          data: this.data_prev2_year,
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: this.colorArray[2],// array should have same number of elements as number of dataset
          borderWidth: 3
        }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            //stacked: true,
            ticks: {
              fontSize: 14
            },
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
              //stacked: true,
              ticks: {
                fontSize: 14
              }
          }]
        },
        legend: {
          labels: {
            fontSize: 18,
          }
        }
      }
    });
  }

  getMonthsData(transactions: Transaction[]){
    for(var month=1;month<=12;month++){
      var month_data_this_year = 0;
      var month_data_prev_year = 0;
      var month_data_prev2_year = 0;
      for (var i=0; i<transactions.length; i++){
        if((this.type=="expense" && transactions[i].category.type=="Gasto") || (this.type=="income" && transactions[i].category.type=="Ingreso")){
          if(transactions[i].month==month && transactions[i].year==this.selected_year){
            month_data_this_year = month_data_this_year + transactions[i].value;
          }
          if(transactions[i].month==month && transactions[i].year==(this.selected_year-1)){
            month_data_prev_year = month_data_prev_year + transactions[i].value;
          }
          if(transactions[i].month==month && transactions[i].year==(this.selected_year-2)){
            month_data_prev2_year = month_data_prev2_year + transactions[i].value;
          }
        }
      }
      this.data_this_year.push(month_data_this_year);
      this.data_prev_year.push(month_data_prev_year);
      this.data_prev2_year.push(month_data_prev2_year);
    }
  }

  optionsFn2(){
    if(this.type=="income"){
      this.colorArray = ['#2FDB11','#13E0DD','#1335E0'];
    }
    if(this.type=="expense"){
      this.colorArray = ['#E01313','#E0A213','#F7FF00'];
    }
    this.data_this_year = [];
    this.data_prev_year = [];
    this.getMonthsData(this.all_transactions); 
    for(var i=0; i<3; i++){
      this.bars.data.datasets[i].borderColor = this.colorArray[i]; 
    }
    this.bars.data.datasets[0].data = this.data_this_year; 
    this.bars.data.datasets[1].data = this.data_prev_year; 
    this.bars.data.datasets[2].data = this.data_prev2_year; 
    this.bars.update();
  }

  addYear(){
    this.data_this_year = [];
    this.data_prev_year = [];
    this.selected_year = this.selected_year + 1;
    this.getMonthsData(this.all_transactions);
    this.bars.data.datasets[0].data = this.data_this_year;
    this.bars.data.datasets[1].data = this.data_prev_year; 
    this.bars.data.datasets[2].data = this.data_prev2_year;  
    this.bars.data.datasets[0].label = this.selected_year;
    this.bars.data.datasets[1].label = this.selected_year-1;
    this.bars.data.datasets[2].label = this.selected_year-2;
    this.bars.update();
  }
  reduceYear(){
    this.data_this_year = [];
    this.data_prev_year = [];
    this.selected_year = this.selected_year - 1;
    this.getMonthsData(this.all_transactions);
    this.bars.data.datasets[0].data = this.data_this_year;
    this.bars.data.datasets[1].data = this.data_prev_year; 
    this.bars.data.datasets[2].data = this.data_prev2_year;  
    this.bars.data.datasets[0].label = this.selected_year;
    this.bars.data.datasets[1].label = this.selected_year-1;
    this.bars.data.datasets[2].label = this.selected_year-2;
    this.bars.update();
  }

}

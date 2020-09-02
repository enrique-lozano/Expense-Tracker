import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Category } from '../../services/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.page.html',
  styleUrls: ['./edit-categories.page.scss'],
})
export class EditCategoriesPage implements OnInit {

  private categories: Category[];

  constructor(private service:DatabaseService, private router: Router) { }

  ngOnInit() {
    if(this.service.all_categories_expenses.length==0){
      this.service.getCategoriesByType("Gasto").subscribe(elem => {
        this.service.all_categories_expenses = elem;
        this.toExpense()
      });  
    }else{
      this.toExpense();
    }
    if(this.service.all_categories_incomes.length==0){
      this.service.getCategoriesByType("Ingreso").subscribe(elem => {
        this.service.all_categories_incomes = elem;
      });  
    }
  }

  compare(a,b){
    if ( a.parent < b.parent ){
      return -1;
    }
    if ( a.parent > b.parent ){
      return 1;
    }
    return 0;
  }

  goAndSelect(url:string, category: Category){
    this.service.selectedCategory=category;
    this.router.navigate([url]);
  }

  go(url:string){
    this.router.navigate([url]);
  }

  toExpense(){
    this.categories = this.service.all_categories_expenses;
    this.categories.sort(this.compare);
  }

  toIncome(){
    this.categories = this.service.all_categories_incomes;
    this.categories.sort(this.compare);
  }

}

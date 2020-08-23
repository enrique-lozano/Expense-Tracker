import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/services/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sel-category-expenses',
  templateUrl: './sel-category-expenses.page.html',
  styleUrls: ['./sel-category-expenses.page.scss'],
})
export class SelCategoryExpensesPage implements OnInit {
  
  private all_categories: Category[];

  constructor(private service:DatabaseService, private router: Router) { }

  ngOnInit() {
    this.service.getCategoriesByType("Gasto").subscribe(elem => {
      this.all_categories = elem;
      this.all_categories.sort(this.compare);
      console.log("Category read. Elements:", this.all_categories.length)
    });    
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


}

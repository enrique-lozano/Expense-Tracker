import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Category } from '../../services/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sel-category',
  templateUrl: './sel-category.page.html',
  styleUrls: ['./sel-category.page.scss'],
})
export class SelCategoryPage implements OnInit {

  private all_categories: Category[];

  constructor(private service:DatabaseService, private router: Router) { }

  ngOnInit() {
    this.service.getCategories().subscribe(elem => {
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

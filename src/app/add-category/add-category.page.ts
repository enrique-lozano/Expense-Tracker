import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  
  public name:string;
  public icon:number = 0; //Index in the all_icons array
  public type:string;
  public type2:string;
  public all_icons;

  constructor(private router: Router, private service:DatabaseService) { }

  ngOnInit() {
    this.all_icons=this.service.all_iconsC;
    this.all_icons.sort(this.compare);
    this.service.all_iconsC = this.all_icons;
  }

  compare(a,b){
    if ( a < b ){
      return -1;
    }
    if ( a > b ){
      return 1;
    }
    return 0;
  }

  add_category(){
    //console.log(this.name, this.service.all_iconsC[this.icon],this.type, this.type2);
    this.service.createCategory(this.name,  this.service.all_iconsC[this.icon], "none", this.type, this.type2);
    this.go('tabs/tab1');
  }

  go(url:string){
    this.router.navigate([url]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

  private name:string;
  private initial_balance:number;
  private icon:number = 0; //Index in the all_icons array
  private all_icons;

  constructor(private router: Router, private service:DatabaseService) { }

  ngOnInit() {
    this.all_icons=this.service.all_icons;
  }

  add_account(){
    this.service.createAccount(this.name,this.initial_balance,this.all_icons[this.icon]);
    this.go('tabs/tab1');
  }

  go(url:string){
    this.router.navigate([url]);
  }

}

import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Account } from '../../services/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sel-account',
  templateUrl: './sel-account.page.html',
  styleUrls: ['./sel-account.page.scss'],
})
export class SelAccountPage implements OnInit {

  private all_accounts: Account[];

  constructor(private service:DatabaseService, private router: Router) { }

  ngOnInit() {
    console.log(this.all_accounts)
    this.service.getAccounts().subscribe(elem => {
      this.all_accounts = elem;
      this.all_accounts.sort(this.compare);
      console.log("Category read. Elements:", this.all_accounts.length)
    });    
  }

  compare(a,b){
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  goAndSelect(url:string, account: Account){
    this.service.selectedAccount=account;
    this.router.navigate([url]);
  }

}

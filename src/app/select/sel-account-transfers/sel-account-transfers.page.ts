import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Account } from '../../services/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sel-account-transfers',
  templateUrl: './sel-account-transfers.page.html',
  styleUrls: ['./sel-account-transfers.page.scss'],
})
export class SelAccountTransfersPage implements OnInit {

  public all_accounts: Account[];

  constructor(private service:DatabaseService, private router: Router) { }

  ngOnInit() {
    if(this.service.all_accounts.length==0){
      this.service.getAccounts().subscribe(elem => {
        this.service.all_accounts = elem;
        this.all_accounts = this.service.all_accounts;
        this.all_accounts.sort(this.compare);
      });
    }else{
      this.all_accounts = this.service.all_accounts;
    }
        
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
    this.service.selectedAccount2=account; //ONLY DIFFERENT WITH PAGE 'sel-account'. Possible component?????
    this.router.navigate([url]);
  }

  go(url:string){
    this.router.navigate([url]);
  }

}

import { Injectable } from '@angular/core';
import { Account, Category, Transaction } from './interfaces';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private accounts:AngularFirestoreCollection<Account>;
  private categories:AngularFirestoreCollection<Category>;
  private transactions:AngularFirestoreCollection<Transaction>;

  public selectedCategory:Category;
  public selectedAccount:Account;
  public all_accounts:Account[];

  constructor(private db: AngularFirestore) {
    this.accounts=this.db.collection('accounts');
    this.categories=this.db.collection('categories');
    this.transactions=this.db.collection('transactions');
  }

  /*---------------------------------------------------
  ----------------------ACCOUNTS-----------------------
  -----------------------------------------------------*/

  public getAccount(id: string):Promise<Account>{
    return this.accounts.doc(id).get().toPromise().then(r=>{
      var account = r.data() as Account;
      return account;
    });
  }
/*
  public getAccountByName(name: string):Observable<Account[]>{
    return this.db.collection<Account>("accounts",res => res.where('name', '==', name)).valueChanges({idField: 'id'});
  }
*/
  public getAccounts():Observable<Account[]>{
    return this.accounts.valueChanges();
  } 

  public createAccount(name: string,initial_balance: number, icon: string){
    var new_account: Account =
    {
      name: name,
      initial_balance: initial_balance,
      balance: initial_balance,
      icon: icon
    };
    return this.accounts.doc(name).set(new_account);  //Name->Primary Key (ID)
  }  

  public createAccount2(data: Account){
    return this.accounts.add(data);
  }
  
  public removeAccount(id: string){ 
    this.getTransactions().subscribe(elem =>{
      for (var i=0; i<elem.length; i++){
        if (elem[i].account.name==id){
          this.transactions.doc(elem[i].id).delete();
        }
      }
      return this.accounts.doc(id).delete();
    })
  }

  /*---------------------------------------------------
  ----------------------CATEGORIES---------------------
  -----------------------------------------------------*/

  public getCategory(id: string):Promise<Category>{
    return this.categories.doc(id).get().toPromise().then(r=>{
      var category = r.data() as Category;
      return category;
    });
  }

  public getCategories():Observable<Category[]>{
    return this.categories.valueChanges();
  }

  public getCategoriesByType(type: string):Observable<Category[]>{
    return this.db.collection<Category>("categories",res => res.where('type', '==', type)).valueChanges();
  }

  public createCategory(name: string, icon: string, parent: string, type: string, type2: string){
    var new_category: Category =
    {
      name: name,
      icon: icon,
      parent: parent,
      type: type,
      type2: type2,
    };
    return this.categories.doc(name).set(new_category); //Name->Primary Key (ID)
  }  

  public createCategory2(data: Category){
    return this.categories.add(data);
  }
  
  public removeCategory(id: string){
    this.getTransactions().subscribe(elem =>{
      for (var i=0; i<elem.length; i++){
        if (elem[i].category.name==id){
          this.transactions.doc(elem[i].id).delete();
        }
      }
      return this.categories.doc(id).delete();
    })
  }

  /*---------------------------------------------------
  ----------------------TRANSACTIONS---------------------
  -----------------------------------------------------*/

  public getTransaction(id: string):Promise<Transaction>{
    return this.transactions.doc(id).get().toPromise().then(r=>{
      var account = r.data() as Transaction;
      return account;
    });
  }

  public getTransactions():Observable<Transaction[]>{
    return this.transactions.valueChanges(); 
  }

  public getTransactionsByYear(year: number):Observable<Transaction[]>{
    return this.db.collection<Transaction>("transactions",res => res.where('year', '==', year)).valueChanges();
  }

  public getTransactionsByMonth(month: number, year: number):Observable<Transaction[]>{
    return this.db.collection<Transaction>("transactions",res => res.where('month', '==', month).where('year','==',year)).valueChanges();
  }

  public getTransactionsByDay(day: number, month: number, year: number):Observable<Transaction[]>{
    return this.db.collection<Transaction>("transactions",res => res.where('day', '==', day).where('year','==',year).where('month','==',month)).valueChanges();
  }

  public createTransaction(category: string, account: string, value: number, date:string, note:string){
    var x: Account;
    var y: Category;
    var year = Number(date.split("-",4)[0]);
    var month = Number(date.split("-",4)[1]);
    var day = Number(date.split("-",4)[2]);
    this.getAccount(account).then(acc =>{
      x = acc;
      this.getCategory(category).then(cat =>{
        y = cat;
        if(cat.type=="Ingreso"){
          var new_balance = acc.balance + value;
          this.accounts.doc(acc.name).update({balance: new_balance})
        }else if(cat.type=="Gasto"){
          var new_balance = acc.balance - value;
          this.accounts.doc(acc.name).update({balance: new_balance})
        }
        var transaction_id = this.db.createId();
        var new_transaction: Transaction =
        {
          category: y,
          account: x,
          value: value,
          year: year,
          month: month,
          day: day,
          note: note,
          id: transaction_id  //ID-> Primary key
        };   
        return this.transactions.doc(transaction_id).set(new_transaction);
        });
      
    });    
  }  

  public createTransaction2(data: Transaction){
    return this.transactions.add(data);
  }
  
  public removeTransaction(id: string){
    this.getTransaction(id).then((elem) => {
      this.getAccount(elem.account.name).then(acc =>{
        this.getCategory(elem.category.name).then(cat =>{
          if(cat.type=="Ingreso"){
            var new_balance = acc.balance - elem.value;
            this.accounts.doc(acc.name).update({balance: new_balance});
          }else if(cat.type=="Gasto"){
            var new_balance = acc.balance + elem.value;
            this.accounts.doc(acc.name).update({balance: new_balance});
          }
          this.transactions.doc(id).delete();
        });
      });
    });
  }

  public removeAllTransactions(){
    this.getTransactions().subscribe(elem =>{
      for (var i=0; i<elem.length; i++){
        this.transactions.doc(elem[i].id).delete();
      }
    })
  }

}

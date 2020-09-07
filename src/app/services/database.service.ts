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
  public transactionToEdit:Transaction;
  public all_accounts:Account[] = [];
  public all_categories:Category[] = [];
  public all_categories_expenses:Category[] = [];
  public all_categories_incomes:Category[] = [];
  public all_transactions:Transaction[] = [];

  public selectedAccount2:Account;

  public all_icons:string[] = ["card","cash","wallet","pricetag","pricetags"]; //For accounts

  public all_iconsC:string[] = ["card","cash","wallet","pricetag","pricetags","pizza","planet",
"airplane", "alarm", "american-football", "barbell", "bandage","basketball","basket","baseball","bicycle","beer",
"boat", "body","bed","book","build","call","car","desktop","fast-food","gift","game-controller","happy","home",
"male-female", "man", "trophy","woman","subway","school", "mail","key","heart","cafe"]; //For categories

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
    console.log("Reading accounts");
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
    this.all_accounts.push(new_account);
    console.log("Create account: ", name);
    return this.accounts.doc(name).set(new_account);  //Name->Primary Key (ID)
  }  

  public createAccount2(data: Account){
    return this.accounts.add(data);
  }

  public editAccount(id: string, new_balance: number, new_icon: string){
    return this.accounts.doc(id).update({name: id, balance: new_balance, icon: new_icon})
  }
  
  public removeAccount(id: string){ 
    console.log("Account removed: ", id);
    if(this.selectedAccount!=undefined){
      for (var i=0; i<this.all_accounts.length; i++){
        if(this.selectedAccount.name == this.all_accounts[i].name){
          this.all_accounts.splice(i,1);
        }
      }
    } 
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
    console.log("Reading categories");
    return this.categories.valueChanges();
  }

  public getCategoriesByType(type: string):Observable<Category[]>{
    console.log("Reading categories of type", type);
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
    this.all_categories.push(new_category);
    if(type=="Ingreso"){
      this.all_categories_incomes.push(new_category);
    }if(type=="Gasto"){
      this.all_categories_expenses.push(new_category);
    }
    console.log("Create category: ", name);
    return this.categories.doc(name).set(new_category); //Name->Primary Key (ID)
  }  

  public createCategory2(data: Category){
    return this.categories.add(data);
  }

  public editCategory(id: string, new_type: string, new_type2: string,new_icon: string){
    return this.categories.doc(id).update({name: id, type: new_type, type2: new_type2, icon: new_icon})
  }
  
  public removeCategory(id: string){
    console.log("Category removed: ", id);
    if(this.selectedAccount!=undefined){
      for (var i=0; i<this.all_categories.length; i++){
        if(this.selectedCategory.name == this.all_categories[i].name){
          this.all_categories.splice(i,1);
        }
      }
      for (var i=0; i<this.all_categories_expenses.length; i++){
        if(this.selectedCategory.name == this.all_categories_expenses[i].name){
          this.all_categories_expenses.splice(i,1);
        }
      }
      for (var i=0; i<this.all_categories_incomes.length; i++){
        if(this.selectedCategory.name == this.all_categories_incomes[i].name){
          this.all_categories_incomes.splice(i,1);
        }
      }
    }
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
    console.log("Reading transactions");
    return this.transactions.valueChanges(); 
  }

  public editTransaction(id: string, new_note: string, new_value: number, new_date:string){
    this.getTransaction(id).then(elem =>{
      this.getAccount(elem.account.name).then(acc =>{
        if(elem.category.type=="Gasto"){
          var new_balance = acc.balance - (new_value-elem.value)
        }if(elem.category.type=="Ingreso"){
          var new_balance = acc.balance + (new_value-elem.value)
        }
        this.accounts.doc(acc.name).update({balance: new_balance})
        if(new_date==''){
          return this.transactions.doc(id).update({note: new_note, value:new_value})
        }else{
          var new_year = Number(new_date.split("-",4)[0]);
          var new_month = Number(new_date.split("-",4)[1]);
          var new_day = Number(new_date.split("-",4)[2]); 
          return this.transactions.doc(id).update({note: new_note, value:new_value, year: new_year, month: new_month, day: new_day})
        }
      });
    });
  }

  public getTransactionsByYear(year: number):Transaction[]{
    var result: Transaction[] = [];
    for (var i=0; i<this.all_transactions.length; i++){
      if(this.all_transactions[i].year == year){
        result.push(this.all_transactions[i]);
      }
    }
    return result;
    //return this.db.collection<Transaction>("transactions",res => res.where('year', '==', year)).valueChanges();
  }

  public getTransactionsByMonth(month: number, year: number):Transaction[]{
    var result: Transaction[] = [];
    for (var i=0; i<this.all_transactions.length; i++){
      if(this.all_transactions[i].month == month && this.all_transactions[i].year == year){
        result.push(this.all_transactions[i]);
      }
    }
    return result;
    //return this.db.collection<Transaction>("transactions",res => res.where('month', '==', month).where('year','==',year)).valueChanges();
  }

  public getTransactionsByDay(day: number, month: number, year: number):Transaction[]{
    var result: Transaction[] = [];
    for (var i=0; i<this.all_transactions.length; i++){
      if(this.all_transactions[i].month == month && this.all_transactions[i].year == year &&  this.all_transactions[i].day == day){
        result.push(this.all_transactions[i]);
      }
    }
    return result;
    //return this.db.collection<Transaction>("transactions",res => res.where('day', '==', day).where('year','==',year).where('month','==',month)).valueChanges();
  }

  public createTransaction(category: string, account: string, value: number, date:string, note:string){
    var x: Account;
    var y: Category;
    var year = Number(date.split("-",4)[0]);
    var month = Number(date.split("-",4)[1]);
    var day = Number(date.split("-",4)[2]);
    if(category==""){
      y =
      {
        name: "Transfer",
        icon: "code-working",
        parent: "",
        type: "Transfer",
        type2: "",
      };
      this.createTransfer(y,value,year,month,day)
      return;
    }
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
        this.all_transactions.push(new_transaction);
        console.log("Create transaction with id:", transaction_id); 
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
        if(elem.category.name!="Transfer"){
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
        }if(elem.category.name=="Transfer"){ //In transfer we do not have categories
          var new_balance = acc.balance + elem.value;
          this.accounts.doc(acc.name).update({balance: new_balance});
          var name2 = elem.note.split(" a ", 2)[1];
          console.log(name2);
          this.getAccount(name2).then(acc2 =>{
            var new_balance2 = acc2.balance - elem.value;
            this.accounts.doc(acc2.name).update({balance: new_balance2});
            this.transactions.doc(id).delete();
          });
        }
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

  public createTransfer(category: Category, value: number, year:number, month:number, day:number){
    this.getAccount(this.selectedAccount.name).then(acc =>{
      this.getAccount(this.selectedAccount2.name).then(acc2 =>{
        var note = "De " + this.selectedAccount.name + " a " + this.selectedAccount2.name;
        var transaction_id = this.db.createId();
        var new_transaction: Transaction =
        {
          category: category,
          account: acc,
          value: value,
          year: year,
          month: month,
          day: day,
          note: note,
          id: transaction_id  //ID-> Primary key
        };  
        var new_balance = acc.balance - value;
        var new_balance2 = acc2.balance + value;
        this.accounts.doc(acc.name).update({balance: new_balance});
        this.accounts.doc(acc2.name).update({balance: new_balance2});
        this.all_transactions.push(new_transaction);
        console.log("Create transfer with id:", transaction_id); 
        return this.transactions.doc(transaction_id).set(new_transaction);
      });
    });
  }


}

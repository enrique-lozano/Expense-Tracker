import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setRed();
  }

  sign:string='-';
  value:string='0';
  buttons = [[1,2,3,'AC'],
  [4,5,6,'Cal'],
  [7,8,9,'Not'],
  ['.',0,'<-','FIN']];

  butPress(num:any){
    if(this.value=='0'){
      this.value = '';
    }

    if(num=='<-'){
      this.value = this.value.slice(0,-1);
      return;
    }
    
    if(num=='AC'){
      this.value = '0';
      document.getElementById("value").style.fontSize="128px";
    }else{
      if(this.value.length>13){
        return;
      }else{
        this.value += num;
      }
    }

    if(this.value.length>3){
      document.getElementById("value").style.fontSize="90px";
    }if(this.value.length>6){
      document.getElementById("value").style.fontSize="75px";
    }if(this.value.length>8){
      document.getElementById("value").style.fontSize="64px";
    }
  }

  setGreen(){
    this.sign='+';
    document.getElementById("top").setAttribute("class","back-green ")
  }
  setRed(){
    this.sign='-';
    document.getElementById("top").setAttribute("class","back-red ")
  }
  setBlue(){
    this.sign='';
    document.getElementById("top").setAttribute("class","back-blue ")
  }



}

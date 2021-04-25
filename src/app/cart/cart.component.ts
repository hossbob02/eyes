import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  @ViewChild('quatity') newquatity:ElementRef
  @ViewChild('id') idd:ElementRef
  arrayCart=[]
  total=0
  constructor(private route:Router) { 
    if(localStorage.getItem('cart')){
      this.arrayCart=JSON.parse(localStorage.getItem('cart'))
      this.arrayCart.forEach(element => {
        this.total=this.total+element.price
      });
    }
   
  }

  ngOnInit(): void {

    
  }

  inc(){
   
  }
  dec(){

  }

  checkout(){
    this.route.navigate(['/checkout'])
  }
  // delete(key){
  //   this.arrayCart=this.arrayCart.filter(item=>item.id==key)
  //   localStorage.removeItem('cart')
  //   localStorage.setItem('cart',JSON.stringify(this.arrayCart))
  //   this.arrayCart.forEach(element => {
  //     this.total=this.total+element.price
  //   });
  // }
  // checkout(){
  //   this.route.navigate(['/checkout'])
  // }
}

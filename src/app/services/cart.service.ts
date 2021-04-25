import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  array=[]
  cart
  num
  constructor(private router:Router) {
    if(localStorage.getItem('cart')){
      this.num=JSON.parse(localStorage.getItem('cart')).length
    this.cart = new BehaviorSubject(this.num)
    }
    
   }
  addtocart(product:Product){
      if(localStorage.getItem('cart')){
        let array=JSON.parse(localStorage.getItem('cart'))
        array.push(product)
        localStorage.setItem('cart',JSON.stringify(array))
        let num=JSON.parse(localStorage.getItem('cart')).length
        this.cart.next(num)
      }else{
       this.array.push(product) 
        localStorage.setItem('cart',JSON.stringify(this.array))
        let num=JSON.parse(localStorage.getItem('cart')).length
      this.cart.next(num)
      }
      
  }
  buynow(product:Product){
    if(localStorage.getItem('cart')){
      let array=JSON.parse(localStorage.getItem('cart'))
      array.push(product)
      localStorage.setItem('cart',JSON.stringify(array))
      let num=JSON.parse(localStorage.getItem('cart')).length
      this.cart.next(num)
      
    }else{
     this.array.push(product) 
      localStorage.setItem('cart',JSON.stringify(this.array))
      let num=JSON.parse(localStorage.getItem('cart')).length
    this.cart.next(num)
    }

  }

 

}

interface Product{
  color:string;
  size:number;
  title:string;
  quantity:number;
  inventory:number;
  type:string;
  price:number;
  id:string;
  image:string

}
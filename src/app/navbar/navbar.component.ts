import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  verif
  ownerBuyer
  uid
  cart
  lengthCart
  constructor(private as:AuthService,private af:AngularFireAuth,private route:Router,private fs:AngularFirestore,private cs:CartService) {
    this.as.user.subscribe((user)=>{
      if(user){
        this.verif=true
        this.uid= user.uid
      }else{
        this.verif=false
      }
     
    })

    if(this.uid || localStorage.getItem("uid")){
      this.fs.collection("users").ref.doc(localStorage.getItem("uid")).get().then(data=>{
        if(data.data()['role']=='owner'){
         this.ownerBuyer=true
        }else{
         this.ownerBuyer=false
        }
      })
    }
    
   }

  ngOnInit(): void {
 if(localStorage.getItem('cart')){
  this.lengthCart=JSON.parse(localStorage.getItem('cart')).length
  this.cs.cart.subscribe(data=>this.lengthCart=data)
 }else{
   this.lengthCart=0
 }

    
  }
logout(){
  this.af.signOut().then(()=>{
    localStorage.removeItem("uid")
    this.route.navigate(['/'])})
}
}

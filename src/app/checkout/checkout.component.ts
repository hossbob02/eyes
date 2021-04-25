import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
uid
solde
arrayCart
total=0
  constructor(private fs:AngularFirestore,private as:AuthService,private route:Router) { 
   this.as.user.subscribe(user=>this.uid=user.uid) 
   this.arrayCart=JSON.parse(localStorage.getItem('cart'))
   this.arrayCart.forEach(element => {
    return this.total=this.total+element.price
   });
  }

  ngOnInit(): void {
    
  }
checkout(f){
  let data=f.value
  this.fs.collection('users').ref.doc(this.uid).get().then(data=>this.solde=data.data()['solde']).then(()=>{
    if(this.solde>this.total){
    this.solde=this.solde-this.total
   
    this.fs.collection("users").doc(this.uid).update({
      solde:this.solde
    }).then(()=>{
      this.fs.collection("purchases").add({
        Address: data.Address,
        Mobile:data.Mobile,
        city:data.city,
        country:data.country,
        email:data.email,
        firstname:data.firstname,
        lastname:data.lastname,
        postalcode:data.postalcode,
        state:data.state,
        uidBuyer:this.uid,
        products:this.arrayCart,
        total:this.total,
        
      }).then(()=>{
        this.route.navigate(['/thankyou'])
        localStorage.removeItem('cart')
      })

    })
  }


  })
  


}
}

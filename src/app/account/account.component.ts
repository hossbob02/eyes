import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  arrayPurchases=[]
  uid
  constructor(private fs:AngularFirestore,private as:AuthService,private af:AngularFireAuth,private route:Router) {
    this.as.user.subscribe(user=>this.uid=user.uid)

    this.fs.collection("purchases").snapshotChanges().subscribe(data=>{
     this.arrayPurchases= data.map(element=>{
          return {
            id:element.payload.doc.id,
            uidBuyer:element.payload.doc.data()['uidBuyer'],
            products:element.payload.doc.data()['products']
          }
      })
      
    })
   }

  ngOnInit(): void {
  }
  logout(){
    this.af.signOut().then(()=>{
      localStorage.removeItem("uid")
      this.route.navigate(['/'])})
  }

}

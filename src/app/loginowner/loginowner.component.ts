import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loginowner',
  templateUrl: './loginowner.component.html',
  styleUrls: ['./loginowner.component.sass']
})
export class LoginOwnerComponent implements OnInit {
  message
  constructor(private as:AuthService,private fs:AngularFirestore,private route:Router) { }


  ngOnInit(): void {
  }

  register(f){
    let data=f.value
    console.log(data)
    this.as.register(data.email,data.password).then((user)=>{
      this.fs.collection("users").doc(user.user.uid).set({
        firstname:data.firstname,
        lastname:data.lastname,
        address: data.address,
        businessname: data.businessname,
        email: data.email,
        role:"owner",
        solde:10000
      }).then(()=>{
        localStorage.setItem("uid",user.user.uid)
        this.route.navigate(['/dashboard'])
        console.log('register')
      })
    })

  }

  login(f){
    let data=f.value;
     this.as.login(data.email,data.password).then((user)=>{
      localStorage.setItem("uid",user.user.uid) 
      console.log('login')
     this.route.navigate(['/dashboard'])
    }).catch(()=>{
       this.message="Invalid email and password"
     })
  }
}

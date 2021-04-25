import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loginclient',
  templateUrl: './loginclient.component.html',
  styleUrls: ['./loginclient.component.sass']
})
export class LoginclientComponent implements OnInit {
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
        role:"client",
        solde:10000

      }).then(()=>{
        console.log('register')
        localStorage.setItem("uid",user.user.uid)
        this.route.navigate(['/products'])
      })
    })

  }

  login(f){
    let data=f.value;
     this.as.login(data.email,data.password).then((user)=>{console.log('login')
     localStorage.setItem("uid",user.user.uid)
     this.route.navigate(['/products'])
    }).catch(()=>{
       this.message="Invalid email and password"
     })
  }
}

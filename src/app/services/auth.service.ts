import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import  firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

 ownerBuyer
  constructor(private af:AngularFireAuth,private fs:AngularFirestore) {
   this.user= this.af.user

   }


   register(email,password) {
     return  this.af.createUserWithEmailAndPassword(email,password)
   }
   login(email,password){
     return this.af.signInWithEmailAndPassword(email,password)
   }
  
}



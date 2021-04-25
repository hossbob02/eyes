import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  colors=[]
  sizes=[]
  uid
  task:AngularFireUploadTask
  ref:AngularFireStorageReference
  message
  products=[]
  constructor(private fs:AngularFirestore,private as:AuthService,private fst:AngularFireStorage,private af:AngularFireAuth,private route:Router) {
    this.as.user.subscribe(user=>{
      this.uid=user.uid
    })
   }

  ngOnInit(): void {
    this.fs.collection("products").snapshotChanges().subscribe(data=>{
    this.products=data.map(element=>{
        return {
          id:element.payload.doc.id,
          uid:element.payload.doc.data()['uid'],
          price:element.payload.doc.data()['price'],
          sizes:element.payload.doc.data()['sizes'],
          colors:element.payload.doc.data()['colors'],
          title:element.payload.doc.data()['title'],
          type:element.payload.doc.data()['type'],
          inventory:element.payload.doc.data()['inventory'],
        }
      })
    })
  }

  Image(event){
    const id=Math.random().toString(36).substring(2)
    this.ref=this.fst.ref(id)
    this.task=this.ref.put(event.target.files[0])

  }

  addproduct(np){
    let data=np.value;
    if(data.white){this.colors.push("white")}
    if(data.red){this.colors.push("red")}
    if(data.green){this.colors.push("green")}
    if(data.black){this.colors.push("black")}
    if(data.orange){this.colors.push("orange")}
    if(data.blue){ this.colors.push("blue")}
    if(data.s){this.sizes.push("s")}  
    if(data.m){this.sizes.push("m")}   
    if(data.l){this.sizes.push("l")}   
    if(data.xl){this.sizes.push("xl")}   
    if(data.xxl){this.sizes.push("xxl")}  
    if(data.xxxl){this.sizes.push("xxxl")}   
    this.task.then((dataa)=>{
      dataa.ref.getDownloadURL().then(url=>{
        // data inserted
        this.fs.collection("products").add({
          title:data.title,
          type:data.type,
          sizes:this.sizes,
          inventory:data.inventory, 
          price:data.price,
          colors:this.colors,
          uid:this.uid,
          image:url
        }).then(()=>{
          this.colors=[]
          this.sizes=[]
        })
        // data inserted
      })
    }).then(()=>{
      this.message="added successfully"
    })

    

  }
  logout(){
    this.af.signOut().then(()=>{
      localStorage.removeItem("uid")
      this.route.navigate(['/'])})
  }
  
}

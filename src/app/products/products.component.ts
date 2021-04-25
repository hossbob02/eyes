import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  products=[]
  constructor(private fs:AngularFirestore,private route:Router) {

    this.fs.collection("products").snapshotChanges().subscribe(data=>{
     this.products=data.map(element=>{
        return{
          id:element.payload.doc.id,
          title:element.payload.doc.data()['title'],
          size:element.payload.doc.data()['type'],
          inventory:element.payload.doc.data()['inventory'],
          price:element.payload.doc.data()['price'],
          colors:element.payload.doc.data()['colors'],
          sizes:element.payload.doc.data()['sizes'],
          image:element.payload.doc.data()['image'],
        }
      })
    })
   }
   details(id){
    this.route.navigate(['/product/'+id])
   }
  ngOnInit(): void {
  }

}

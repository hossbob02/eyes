import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {
  id
  dataProduct={
    colors:[],
    sizes:[],
    image:'',
    inventory:0,
    price:0,
    title:'',
    type:'',
    uid:'',
    status:'pending'
  }
  quantity=2
  sizeSelect
  colorSelect
  AddDataProduct:Product={
    color:'',
    size:0,
    inventory:0,
    quantity:0,
    price:0,
    title:'',
    type:'',
    id:'',
    image:'',
    uid:'',
    status:'pending'
  }
  constructor(private routes:ActivatedRoute,private fs:AngularFirestore,private cs:CartService,private router:Router) {
    this.routes.params.subscribe((param)=>{
      this.id=param.id
    })

    this.fs.collection("products").ref.doc(this.id).get().then((data)=>{
     
      this.dataProduct.title=data.data()['title']
      this.dataProduct.image=data.data()['image']
      this.dataProduct.inventory=data.data()['inventory']
      this.dataProduct.price=data.data()['price']
      this.dataProduct.colors=data.data()['colors']
      this.dataProduct.sizes=data.data()['sizes']
      this.dataProduct.type=data.data()['type']
      this.dataProduct.uid=data.data()['uid']
    })
    console.log(this.dataProduct)
   }

  ngOnInit(): void {
  }
  inc(){
    this.quantity++
  }
  dec(){
    this.quantity--
  }
  affichesize(event){
    this.sizeSelect=event.target.value
    console.log(this.sizeSelect)
  }
  affichecolors(event){
   this.colorSelect=event.target.value
   console.log(this.colorSelect)
  }

  addtocart(){
    this.AddDataProduct.color=this.colorSelect
    this.AddDataProduct.size=this.sizeSelect
    this.AddDataProduct.title=this.dataProduct.title
    this.AddDataProduct.quantity=this.quantity
    this.AddDataProduct.inventory=this.dataProduct.inventory
    this.AddDataProduct.type=this.dataProduct.type
    this.AddDataProduct.price=this.dataProduct.price
    this.AddDataProduct.id=this.id
    this.AddDataProduct.image=this.dataProduct.image
    this.AddDataProduct.uid=this.dataProduct.uid
    this.AddDataProduct.status=this.dataProduct.status
   this.cs.addtocart(this.AddDataProduct)
    

  }
  buyitnow(){
    this.AddDataProduct.color=this.colorSelect
    this.AddDataProduct.size=this.sizeSelect
    this.AddDataProduct.title=this.dataProduct.title
    this.AddDataProduct.quantity=this.quantity
    this.AddDataProduct.inventory=this.dataProduct.inventory
    this.AddDataProduct.type=this.dataProduct.type
    this.AddDataProduct.price=this.dataProduct.price
    this.AddDataProduct.id=this.id
    this.AddDataProduct.image=this.dataProduct.image
    this.AddDataProduct.uid=this.dataProduct.uid
    this.AddDataProduct.status=this.dataProduct.status

    this.cs.buynow(this.AddDataProduct)
    this.router.navigate(['/checkout'])
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
  uid:string,
  status:string
}
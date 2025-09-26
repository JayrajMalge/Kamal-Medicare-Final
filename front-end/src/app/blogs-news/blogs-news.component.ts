import { Component, OnInit } from '@angular/core';
import { BlogNewsBoxComponent } from '../blog-news-box/blog-news-box.component';
import { UserServiceService } from '../user-service.service';
import { News, Section } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';

@Component({
  selector: 'app-blogs-news',
  standalone: true,
  imports: [BlogNewsBoxComponent,FormsModule,CommonModule],
  templateUrl: './blogs-news.component.html',
  styleUrl: './blogs-news.component.css'
})
export class BlogsNewsComponent implements OnInit{
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService){}
  newsarray : News[] = []
  section : Section = new Section()
  
  loginstatus : boolean = false
  ngOnInit(): void {
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{}
    )
    this.userservice.getnews("getnews").subscribe(
     (response)=>{
       this.newsarray = response
     },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",5).subscribe(
      (response)=>{
          this.section = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",5).subscribe(
      (response)=>{
          this.heading = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",14).subscribe(
      (response)=>{
          this.content = response
      },(error)=>{}
    )
  }
  heading : Section = new Section()
  content : Section = new Section()
  onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 5,
      heading : 'section7heading',
      content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
    )
  }
  oncontentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 14,
      heading : 'section7content',
      content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
    )
  }
}



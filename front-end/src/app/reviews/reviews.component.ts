import { Component, OnInit } from '@angular/core';
import { ReviewboxComponent } from "../reviewbox/reviewbox.component";
import { UserServiceService } from '../user-service.service';
import { Review, Section ,filehandle} from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ ReviewboxComponent,FormsModule,CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit{
   constructor(private userservice : UserServiceService,private imageservice : ImageServiceService){}
   reviews : Review[] = []
   loginstatus : boolean = false

   ngOnInit(): void {
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
     this.userservice.getreviews("getallreviews").subscribe(
      (response)=>{
            this.reviews = response
      },(error)=>{}
     )
     this.userservice.getsectionbysectionid("getsectionbysectionid",91).subscribe(
      (response)=>{
          console.log(response)
          this.heading = response
      },(error)=>{}
    )
   }
   heading : Section = new Section()
   onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 91,
    heading : data,
    content : this.heading.content
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
  }
  oncontentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 91,
    heading : this.heading.heading,
    content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
  }


  currentImageIndex : number = 0
  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.reviews.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.reviews.length) %
      this.reviews.length;
  }
}



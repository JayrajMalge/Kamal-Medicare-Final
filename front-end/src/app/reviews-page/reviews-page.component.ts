import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ReviewboxComponent } from '../reviewbox/reviewbox.component';
import { UserServiceService } from '../user-service.service';
import { Review ,Section} from '../enities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-reviews-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReviewboxComponent,CommonModule,FormsModule],
  templateUrl: './reviews-page.component.html',
  styleUrl: './reviews-page.component.css'
})
export class ReviewsPageComponent {
  constructor(private userservice : UserServiceService){}
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
    this.userservice.getsectionbysectionid("getsectionbysectionid",96).subscribe(
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
    sectionid : 96,
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
    sectionid : 96,
    heading : this.heading.heading,
    content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
  }
}


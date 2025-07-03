import { CommonModule } from '@angular/common';
import { Component, OnInit ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Section, Specialization, disease } from '../enities';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-alldiseases',
  standalone: true,
  imports: [FormsModule,CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './alldiseases.component.html',
  styleUrl: './alldiseases.component.css'
})
export class AlldiseasesComponent {
  logo : Section = new Section()
  diseases : disease[] = []
  loginstatus : boolean = true
  mainspinner : boolean = false

  search : string = ''
  constructor(private route : Router,private userservices : UserServiceService){}
  ngOnInit(): void {
    this.mainspinner = true
    this.userservices.getAllcompletediseases("getalldiseases").subscribe(
      (resposnes)=>{
          this.diseases = resposnes
      },(error)=>{}
    )
    const email = window.localStorage.getItem("email")??''
    this.userservices.getsectionbysectionid("getsectionbysectionid",98).subscribe(
      (response)=>{
        this.logo = response
        this.mainspinner = false
      },(error)=>{}
    )
  }

  searchspe(){
    if(this.search!=''){
      this.userservices.getdiseasebyfieldname("getalldiseasesbyname",this.search).subscribe(
        (response)=>{
           this.diseases = response
        },(error)=>{}
      )
    }
    else{
      this.userservices.getdiseasebyfieldname("getalldiseasesbyname",this.search).subscribe(
        (response)=>{
            this.diseases = response
        },(error)=>{}
      )
    }
  }

  onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 98,
    heading : data,
    content : this.logo.content
    }
    this.userservices.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
    }
    oncontentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 98,
    heading : this.logo.heading,
    content : data
    }
    this.userservices.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
    )
    }
}

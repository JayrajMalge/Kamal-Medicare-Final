import { CommonModule } from '@angular/common';
import { Component, OnInit ,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { response } from 'express';
import { ReviewformComponent } from '../reviewform/reviewform.component';
import { Facility, Section, Specialization, disease } from '../enities';
import { AppoinmentformComponent } from "../appoinmentform/appoinmentform.component";
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReviewformComponent, AppoinmentformComponent,ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  loginstatus : boolean = false
  email : string = '';
  role : string = '';
  user : any 

  facilites : Facility[] = []
  logo : Section = new Section()
  specializationarray : Specialization[] = []
  diseasearray : disease[] = []
  constructor(private route : Router,private userservices : UserServiceService){}
  ngOnInit(): void {
    this.userservices.getAllcompletediseases("getalldiseases").subscribe(
      (resposnes)=>{
          this.diseasearray = resposnes
      },(error)=>{}
    )
    this.email = window.localStorage.getItem("email")??''
    const length = this.email.length;
    if(this.email!=null && length > 0){
      this.loginstatus = true
      this.userservices.getuserbyemail("getbyemail",this.email).subscribe(
        (response)=>{
            this.user = response
            this.role = this.user.role
        },(error)=>{}
      )
    }
    this.userservices.getfacilites("getfacilites").subscribe(
      (response)=>{
            this.facilites = response
      },(error)=>{}
    )
    this.userservices.getspecailizations("getspecializations").subscribe(
      (response)=>{
          this.specializationarray = response
      },(error)=>{}
    )
    this.userservices.getsectionbysectionid("getsectionbysectionid",7).subscribe(
      (response)=>{
        this.logo = response
      },(error)=>{}
    )
  }
  logout(){
    window.localStorage.removeItem("email")
    this.route.navigate(['/'])
  }


  checkinput(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 7,
       heading : 'logo',
       content : data
    }
    this.userservices.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
    )
  }
  isDialogOpen: boolean = false;
  openDialog() {
    this.isDialogOpen = true;
  }
  handleClose() {
    this.isDialogOpen = false;
  }
  handleFormSubmit(message: string) {
    console.log('Form submitted with message:', message);
  }

  isprofile: boolean = false;
  openprofiledialog() {
    this.isprofile = true;
  }
  handleprofile() {
    this.isprofile = false;
  }

  handleprofilesubmit() {
    this.isprofile = false;
  }


  isappointmentopen: boolean = false;
  openAppointment() {
    this.isappointmentopen = true;
  }
  handleAppointmentClose() {
    this.isappointmentopen = false;
  }
  handleFormAppointmentSubmit() {
  }

  isMenuOpen = false;

  menuItems = [
    { label: 'Facilities', isOpen: false },
    { label: 'Specialization', isOpen: false },
    { label: 'Diseases', isOpen: false},
    { label: 'news-blogs',isOpen: false}
  ];

  subItems : any[] = []
  toggleMenu(index: number) {
    this.menuItems.forEach((item, i) => {
      if (i !== index) item.isOpen = false;
    });
    this.menuItems[index].isOpen = !this.menuItems[index].isOpen;
    if(index==0){
      this.subItems = []
      this.facilites.map((fac)=>{
         this.subItems.push({"id":fac.facilitesid,"name":fac.facilityname})
      })
    } else if(index==1){
      this.subItems = []
      this.specializationarray.map((fac)=>{
        this.subItems.push({"id":fac.speacializationid,"name":fac.fieldname})
     })
    } else if(index==2){
      this.subItems = []
      this.diseasearray.map((fac)=>{
        this.subItems.push({"id":fac.diseaseid,"name":fac.name})
     })
    } else if(index==3){
      this.subItems = []
        this.subItems.push({"name":"Blogs","id":"news-blogs/Blog"})
        this.subItems.push({"name":"News","id":"news-blogs/News"})
        this.subItems.push({"name":"Research","id":"news-blogs/Research"})
        this.subItems.push({"name":"Treatments","id":"/treatments"})
        this.subItems.push({"name":"Media","id":"news-blogs/Media"})
    }
  }

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  
  changeroute(itme : string,subitem : any){
    if(itme=='Facilities'){
      this.route.navigate(["/facilites/"+subitem])
    } else if(itme=='Specialization'){
      this.route.navigate(["/speacialization/"+subitem])
    } else if(itme=='Diseases'){
      this.route.navigate(["/diseases/"+subitem])
    } else if(itme=='news-blogs'){
      this.route.navigate([subitem])
    }
  }
}



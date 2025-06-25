import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Doctor, Facility, Section, Specialization, SubSpecialization, hospital } from '../enities';
import { AppoinmentformComponent } from '../appoinmentform/appoinmentform.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AppoinmentformComponent,CommonModule,FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  constructor(private userservice : UserServiceService){}
  
  mail : hospital = new hospital()
  address : hospital = new hospital()
  mobileno : hospital = new hospital()
  socials : hospital[] = []
  mission : hospital = new hospital()

  loginstatus : boolean = false
  doctorarray : Doctor[] = []
  subspecializationarray : Specialization[] = []
  facilitesarray : Facility[] = []

  ngOnInit(): void {
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
          this.userservice.getdoctors("getdoctors").subscribe(
            (response)=>{
                this.doctorarray = response
            },(error)=>{}
          )
          this.userservice.getfacilites("getfacilites").subscribe(
            (resposnes)=>{
                this.facilitesarray = resposnes
            },(error)=>{}
          )
          this.userservice.getspecailizations("getspecializations").subscribe(
            (response)=>{
              this.subspecializationarray = response
            },(error)=>{}
          )
      },(error)=>{}
    )
    console.log(this.loginstatus)
    this.userservice.getuserbyemail("gethospitaldata",'mail').subscribe(
      (response)=>{this.mail = response[0]},(error)=>{}
    )
    this.userservice.getuserbyemail("gethospitaldata",'mission').subscribe(
      (response)=>{this.mission = response[0]},(error)=>{}
    )
    this.userservice.getuserbyemail("gethospitaldata","address").subscribe(
      (response)=>{
        this.address = response[0]
      },(error)=>{}
    )
    this.userservice.getuserbyemail("gethospitaldata","mobileno").subscribe(
      (response)=>{this.mobileno = response[0]},(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",93).subscribe(
      (response)=>{
          this.aboutsection = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",94).subscribe(
      (response)=>{
          this.contactsection = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",16).subscribe(
      (response)=>{
          this.mailsection = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",17).subscribe(
      (response)=>{
          this.mobilenosection = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",92).subscribe(
      (response)=>{
          this.socialsection = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",95).subscribe(
      (response)=>{
          this.appointmentheadingsection = response
      },(error)=>{}
    )
  }

  socialsection : Section = new Section()
  aboutsection  : Section = new Section()
  contactsection : Section = new Section()
  mailsection  : Section = new Section()
  mobilenosection : Section = new Section()
  appointmentheadingsection  : Section = new Section()


  isappointmentopen : boolean = false
  openAppointment() {
    this.isappointmentopen = true;
  }
  handleAppointmentClose() {
    this.isappointmentopen = false;
  }
  handleFormAppointmentSubmit() {
  }

  

  onaboutheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 93,
      heading : data,
      content : this.aboutsection.content
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{},(error)=>{}
    )
  }
  onaboutcontentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 93,
      heading : this.aboutsection.heading,
      content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{},(error)=>{}
    )
  }
  onsocialheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 92,
    heading : data,
    content : this.socialsection.content
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{},(error)=>{}
    )
  }
  onsocialcontentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 92,
    heading : this.socialsection.heading,
    content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{},(error)=>{}
    )
  }
  oncontactchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 94,
    heading : this.contactsection.heading,
    content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{},(error)=>{}
    )
  }
  onmailchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 16,
    heading : this.mailsection.heading,
    content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{},(error)=>{}
    )
  }
  onmobilenochange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 17,
    heading :  this.mobilenosection.heading,
    content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{},(error)=>{}
    )
  }
  onappointmentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
    sectionid : 95,
    heading : this.appointmentheadingsection.heading,
    content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{},(error)=>{}
    )
  }
}




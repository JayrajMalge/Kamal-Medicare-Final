import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Section, filehandle } from '../enities';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';
import { Router } from '@angular/router';
import { AppoinmentformComponent } from '../appoinmentform/appoinmentform.component';
import { SpeacializationpagefullComponent } from "../speacializationpagefull/speacializationpagefull.component";

@Component({
  selector: 'app-appoinmentsetup',
  standalone: true,
  imports: [CommonModule, AppoinmentformComponent],
  templateUrl: './appoinmentsetup.component.html',
  styleUrl: './appoinmentsetup.component.css'
})
export class AppoinmentsetupComponent {

  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private route : Router){}
  loginstatus : boolean = false
  section : Section = new Section()
  filehandle : filehandle = new filehandle()

  car1 : Section = new Section()
  /*
  ngOnInit(): void {
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",6).subscribe(
     (response)=>{
         this.heading = response
         console.log(response)
         this.filehandle =this.imageservice.bytetoimage(this.heading.imgvid,this.heading.imagetype,this.heading.imagename)
     },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",9).subscribe(
      (response)=>{
        this.content = response
      },(error)=>{}
    )
  }*/


  isappointmentopen: boolean = false;
  openAppointment() {
    if(this.loginstatus){
      this.isappointmentopen = true;
    }else{
      this.route.navigate(["/login"])
    }
  }
  handleAppointmentClose() {
    this.isappointmentopen = false;
  }
  handleFormAppointmentSubmit() {
  }



  /*oncarcontentchange(event : any,index : number)
  {
    const data = event.target.innerHTML
    const s  = {
      sectionid : this.carouselData[index].id,
       heading : this.car1.heading,
       content : data,
       imagename : this.car1.imagename,
       imagetype : this.car1.imagetype,
       imgvid : this.car1.imgvid
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }
  oncarheadingchange(event : any,index : number)
  {
    const data = event.target.innerHTML
    const s  = {
      sectionid : this.carouselData[index].id,
       heading : data,
       content : this.car1.content,
       imagename : this.car1.imagename,
       imagetype : this.car1.imagetype,
       imgvid : this.car1.imgvid
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }*/

  triggerFileInput() {
    const fileInput = document.getElementById('visionfileinput') as HTMLInputElement;
    fileInput.click();
  }
  onchange(event : any,index : number){
    const file = event.target.files[0];
    this.car1.imagename = file.name
    this.car1.imagetype = file.type
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer; 
      const byteArray = new Uint8Array(arrayBuffer);
      this.car1.imgvid = Array.from(byteArray)
      const s  = {
        sectionid : this.carouselData[index].id,
         heading : this.car1.heading,
         content : this.car1.content,
         imagename : this.car1.imagename,
         imagetype : this.car1.imagetype,
         imgvid :  Array.from(byteArray)
        }
      this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
        },(error)=>{}
      )
    };
    /*if (file) {
      reader.readAsDataURL(file); // Read the file as a Base64 string
    }*/
  }
  oncontentchange(event : any)
  {
    const data = event.target.innerHTML
    const s  = {
      sectionid : 9,
       heading : 'section2content',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }
  carouselData = [
    {
      id : 101,
      filehandle : filehandle,
      heading: 'Slide 1 Heading',
      paragraph: 'This is the content for slide 1.'
    },
    {
      id : 102,
      filehandle : filehandle,
      heading: 'Slide 2 Heading',
      paragraph: 'This is the content for slide 2.'
    },
    {
      id : 103,
      filehandle : filehandle,
      heading: 'Slide 3 Heading',
      paragraph: 'This is the content for slide 3.'
    }
  ];

  filehandles : filehandle[] = []

  currentIndex = 0;



  ngOnInit(): void {
    this.autoPlay();
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
       this.loginstatus = response.role=='Admin'
      },(error)=>{

      }
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",101).subscribe(
      (response)=>{
        this.car1 = response
        this.filehandles.push(this.imageservice.bytetoimage(this.car1.imgvid,this.car1.imagetype,this.car1.imagename))
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",102).subscribe(
      (response)=>{
        this.car1 = response
        this.filehandles.push(this.imageservice.bytetoimage(this.car1.imgvid,this.car1.imagetype,this.car1.imagename))
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",103).subscribe(
      (response)=>{
        this.car1 = response
        this.filehandles.push(this.imageservice.bytetoimage(this.car1.imgvid,this.car1.imagetype,this.car1.imagename))
      },(error)=>{}
    )
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselData.length) % this.carouselData.length;
  }

  autoPlay(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); 
  }

}

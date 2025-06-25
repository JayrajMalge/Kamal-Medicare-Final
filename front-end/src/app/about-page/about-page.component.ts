import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService } from '../user-service.service';
import { Section, filehandle, hospital } from '../enities';
import { ImageServiceService } from '../image-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent implements OnInit{
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,public san : DomSanitizer){}
  hospitaldata : hospital[] = []
  aboutfile : filehandle = new filehandle()
  loginstatus : boolean = false
  mainspinner : boolean = false

  ngOnInit(): void {
    this.mainspinner = true
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
        console.log()
        if(response.role=='Admin'){
          this.loginstatus = true
        }else{
          this.loginstatus = false
        }
      },(error)=>{

      }
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",15).subscribe(
      (response)=>{
          this.about = response
          this.aboutfile = this.imageservice.bytetoimage(this.about.imgvid,this.about.imagetype,this.about.imagename)
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",19).subscribe(
      (response)=>{
          this.mission = response
          this.missionfile = this.imageservice.bytetoimage(this.mission.imgvid,this.mission.imagetype,this.mission.imagename)
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",21).subscribe(
      (response)=>{
          this.vision = response
          this.visionfile = this.imageservice.bytetoimage(this.vision.imgvid,this.vision.imagetype,this.vision.imagename)
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",20).subscribe(
      (response)=>{
          this.goal = response
          this.goalfile = this.imageservice.bytetoimage(this.goal.imgvid,this.goal.imagetype,this.goal.imagename)
          this.mainspinner = false
      },(error)=>{}
    )
  }

  about    : Section = new Section()
  mission  : Section = new Section()
  vision   : Section = new Section()
  goal     : Section = new Section()

    ongoalheadingchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.goal.sectionid,
        heading : data,
        content : this.goal.content,
        imgvid : this.goal.imgvid,
        imagetype : this.goal.imagetype,
        imagename : this.goal.imagename
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{

      },(error)=>{}
      )
    }
    onaboutheadingchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.about.sectionid,
        heading : data,
        content : this.about.content,
        imagename : this.about.imagename,
           imagetype : this.about.imagetype,
           imgvid : this.about.imgvid
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{

      },(error)=>{}
      )
    }
    onmissionheadingchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.mission.sectionid,
        heading : data,
        content : this.mission.content,
        imgvid : this.mission.imgvid,
        imagetype : this.mission.imagetype,
        imagename : this.mission.imagename
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{

      },(error)=>{}
      )
    }
    onvisionheadingchange(event : any){
      const data = event.target.innerHTML
      const s : Section = {
        sectionid : this.vision.sectionid,
        heading : data,
        content : this.vision.content,
        imgvid : this.vision.imgvid,
        imagetype : this.vision.imagetype,
        imagename : this.vision.imagename
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{

      },(error)=>{}
      )
    }
    onmissioncontentchange(event : any){
      const data = event.target.innerHTML
      const s : Section = {
        sectionid : this.mission.sectionid,
        heading : this.mission.heading,
        content : data,
        imgvid : this.mission.imgvid,
        imagetype : this.mission.imagetype,
        imagename : this.mission.imagename
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{

      },(error)=>{}
      )
    }
    ongoalcontentchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.goal.sectionid,
        heading : this.goal.heading,
        content : data,
        imgvid : this.goal.imgvid,
        imagetype : this.goal.imagetype,
        imagename : this.goal.imagename
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
      )
    }
    onvisioncontentchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.vision.sectionid,
        heading : this.vision.heading,
        content : data,
        imgvid : this.vision.imgvid,
        imagetype : this.vision.imagetype,
        imagename : this.vision.imagename
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
      )
    }
    onaboutcontentchange(event : any){
      const data = event.target.innerHTML
      const s = {
        sectionid : this.about.sectionid,
        heading : this.about.heading,
        content : data,
        imagename : this.about.imagename,
           imagetype : this.about.imagetype,
           imgvid : this.about.imgvid
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
      )
    }

    triggerFileInput() {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput.click();
    }
    onchange(event : any){
      const file = event.target.files[0];
      this.about.imagename = file.name
      this.about.imagetype = file.type
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        this.about.imgvid = Array.from(byteArray)
        const s  = {
          sectionid : 15,
           heading : this.about.heading,
           content : this.about.content,
           imagename : this.about.imagename,
           imagetype : this.about.imagetype,
           imgvid : this.about.imgvid
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

    triggermissionFileInput(){
      const fileInput = document.getElementById('missionfileinput') as HTMLInputElement;
      fileInput.click();
    }
    triggervisionFileInput(){
      const fileInput = document.getElementById('visionfileinput') as HTMLInputElement;
      fileInput.click();
    }
    triggergoalFileInput(){
      const fileInput = document.getElementById('goalfileinput') as HTMLInputElement;
      fileInput.click();
    }

    missionfile : filehandle = new filehandle()
    goalfile : filehandle = new filehandle()
    visionfile : filehandle = new filehandle()
    onmissionimagechange(event : any){
      const file = event.target.files[0];
      this.mission.imagename = file.name
      this.mission.imagetype = file.type
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        this.mission.imgvid = Array.from(byteArray)
        const s  = {
          sectionid : 19,
           heading : this.mission.heading,
           content : this.mission.content,
           imagename : this.mission.imagename,
           imagetype : this.mission.imagetype,
           imgvid :  Array.from(byteArray)
        }
        this.userservice.savesection("updatesection",s).subscribe(
          (response)=>{
          },(error)=>{}
        )
      };
    }
    onvisionimagechange(event : any){
      const file = event.target.files[0];
      this.vision.imagename = file.name
      this.vision.imagetype = file.type
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        this.vision.imgvid = Array.from(byteArray)
        const s  = {
          sectionid : 21,
           heading : this.vision.heading,
           content : this.vision.content,
           imagename : this.vision.imagename,
           imagetype : this.vision.imagetype,
           imgvid :  Array.from(byteArray)
        }
        this.userservice.savesection("updatesection",s).subscribe(
          (response)=>{
          },(error)=>{}
        )
      };
    }
    ongoalimagechange(event : any){
      const file = event.target.files[0];
      this.goal.imagename = file.name
      this.goal.imagetype = file.type
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        this.goal.imgvid = Array.from(byteArray)
        const s  = {
          sectionid : 20,
           heading : this.goal.heading,
           content : this.goal.content,
           imagename : this.goal.imagename,
           imagetype : this.goal.imagetype,
           imgvid :  Array.from(byteArray)
        }
        this.userservice.savesection("updatesection",s).subscribe(
          (response)=>{
          },(error)=>{}
        )
      };
    }

}


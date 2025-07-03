import { Component, Input, OnInit } from '@angular/core';
import { Section, SubSpecialization, SubSpecializationimgvideo, Treatment, filehandle } from '../enities';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speacializationpagefull',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './speacializationpagefull.component.html',
  styleUrl: './speacializationpagefull.component.css'
})
export class SpeacializationpagefullComponent implements OnInit{

   treatments : Treatment[] = []
   constructor(private userservice : UserServiceService,private imageservice : ImageServiceService){}
   heading : Section = new Section()
   content : Section = new Section()
   loginstatus : boolean = false
   filehandle : filehandle = new filehandle()
   ngOnInit(): void {
      const email = window.localStorage.getItem("email")??''
      this.userservice.getuserbyemail("getbyemail",email).subscribe(
        (response)=>{
            this.loginstatus = response.role=='Admin'
        },(error)=>{}
      )
      this.userservice.gettreatments("getalltreatments").subscribe(
        (response)=>{this.treatments = response},(error)=>{}
      )
      this.userservice.getsectionbyheading("getbyheading","Treatments_heading").subscribe(
        (response)=>{
            this.heading = response
            this.userservice.getsectionbyheading("getbyheading","Treatments_content").subscribe(
              (response)=>{
                  this.content = response
                  this.filehandle=this.imageservice.bytetoimage(this.content.imgvid,this.content.imagetype,this.content.imagename)
              },(error)=>{}
             )
        },(error)=>{}
       )
   }

   onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
        sectionid : this.heading.sectionid,
        heading : this.heading.heading,
        content : data
    }
    this.userservice.savesection("updatesection",s).subscribe((response)=>{},(error)=>{})
  }
  oncontentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
       sectionid : this.content.sectionid,
       heading : this.content.heading,
       content : data,
       imagename : this.content.imagename,
       imagetype : this.content.imagetype,
       imgvid :  this.content.imgvid
    }
    this.userservice.savesection("updatesection",s).subscribe((response)=>{},(error)=>{})
  }
  
  triggerFileInput(){
    const fileInput = document.getElementById('visionfileinput') as HTMLInputElement;
    fileInput.click();
  }
  
  onimagechange(event : any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer; 
      const byteArray = new Uint8Array(arrayBuffer);
      const s  = {
        sectionid : this.content.sectionid,
         heading : this.content.heading,
         content : this.content.content,
         imagename : file.name,
         imagetype : file.type,
         imgvid :  Array.from(byteArray)
      }
      this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
        },(error)=>{}
      )
    };
  }

}

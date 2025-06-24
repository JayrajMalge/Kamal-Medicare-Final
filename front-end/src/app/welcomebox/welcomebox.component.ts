import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { CaseStudy, Doctor, Section ,Treatment,filehandle, showcasestudy, showtreatment} from '../enities';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { DoctorBoxComponent } from '../doctor-box/doctor-box.component';

@Component({
  selector: 'app-welcomebox',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent,HeaderComponent,DoctorBoxComponent],
  templateUrl: './welcomebox.component.html',
  styleUrl: './welcomebox.component.css'
})
export class WelcomeboxComponent {
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private route : ActivatedRoute){}
  heading : Section = new Section()
  content : Section = new Section()

  filehandle : filehandle = new filehandle()
  loginstatus : boolean = false
  treatmentid : number = 0
  treatments : Treatment[] = []
  
  Doctor : Doctor[] = []
  
  showtreatmentsarray : showtreatment[] = []
  showcasestudiesarray : showcasestudy[] = []

  showtreatment : showtreatment = new showtreatment()
  casestudiesimages : showcasestudy = new showcasestudy()


  ngOnInit(): void {
    const email = window.localStorage.getItem("email")??''
    this.treatmentid =Number(this.route.snapshot.paramMap.get("treatmentid"))
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{}
    )
    /*this.userservice.getsectionbysectionid("getsectionbysectionid",1).subscribe(
     (response)=>{
         this.heading = response
         this.filehandle = this.imageservice.bytetoimage(this.heading.imgvid,this.heading.imagetype,this.heading.imagename)
     },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",10).subscribe(
      (response)=>{
          this.content = response
      },(error)=>{}
     )*/
     this.userservice.gettreatments("gettreatmentbytreatmentid/"+this.treatmentid).subscribe(
      (response)=>{
        this.treatments = response;
        this.showtreatment.treatment = this.treatments[0]
        this.userservice.getcasestudy("getcasestudiesbytreatment/"+this.treatmentid).subscribe(
          (response)=>{
                this.showtreatment.treatment = this.treatments[0]
                for(let j=0;j<response.length;j++){
                    this.casestudiesimages.casestudy = response[j]
                    this.userservice.getcasestudyimages("getcasestudiesimagesbycasestudyid/"+response[j].casestudyid).subscribe(
                    (response)=>{
                        response.map((res)=>{
                          this.casestudiesimages.casestudyimages.push(this.imageservice.bytetoimage(res.image,res.imagetype,res.imagename));
                        })
                        //this.casestudiesimages.casestudyimages = response
                        this.showtreatment.casestudiesarray.push(this.casestudiesimages)
                        this.casestudiesimages = new showcasestudy()
                    },(error)=>{}
                    )
                }
          },(error)=>{}
        )
          this.showtreatmentsarray.push(this.showtreatment)
      },(error)=>{}
     )
     this.userservice.getdoctors("getdoctorfromtreatments/"+this.treatmentid).subscribe(
      (response)=>{this.Doctor = response;console.log(response)},(error)=>{}
     )
  }

  onheadingchange(event : any)
  {
    const data = event.target.innerHTML
    const s  = {
      sectionid : 1,
       heading : 'section3heading',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }

  triggerFileInput() {
    const fileInput = document.getElementById('welcomefileinput') as HTMLInputElement;
    fileInput.click();
  }
  onwelcomechange(event : any){
    const file = event.target.files[0];
    this.heading.imagename = file.name
    this.heading.imagetype = file.type
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer; 
      const byteArray = new Uint8Array(arrayBuffer);
      this.heading.imgvid = Array.from(byteArray)
      const s  = {
        sectionid : 1,
         heading : this.heading.heading,
         content : this.heading.content,
         imagename : this.heading.imagename,
         imagetype : this.heading.imagetype,
         imgvid :  Array.from(byteArray)
      }
      this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
          console.log(response)
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
      sectionid  : 10,
       heading : 'section3content',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }
}

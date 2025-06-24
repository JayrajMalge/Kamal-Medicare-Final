import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BlogNewsBoxComponent } from '../blog-news-box/blog-news-box.component';
import { UserServiceService } from '../user-service.service';
import { News ,Section, filehandle} from '../enities';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';


@Component({
  selector: 'app-news-blogs-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,BlogNewsBoxComponent,FormsModule,CommonModule],
  templateUrl: './news-blogs-page.component.html',
  styleUrl: './news-blogs-page.component.css'
})
export class NewsBlogsPageComponent implements OnInit{

  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private route : ActivatedRoute){}
  newsarray : News[] = []
  loginstatus : boolean = false
  filehandle : filehandle = new filehandle()
  doctorid : string = ''
  ngOnInit() {
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{}
    )
    this.doctorid =String(this.route.snapshot.paramMap.get("newstype"))
    if(this.doctorid!=null && this.doctorid!=''){
      this.userservice.getnews("getnewsbynewstype/"+this.doctorid).subscribe(
        (response)=>{
           this.newsarray = response
        },(error)=>{}
      )
      this.userservice.getsectionbyheading("getbyheading",this.doctorid+"_heading").subscribe(
        (response)=>{
            this.heading = response
            this.userservice.getsectionbyheading("getbyheading",this.doctorid+"_content").subscribe(
              (response)=>{
                  this.content = response
                  this.filehandle=this.imageservice.bytetoimage(this.content.imgvid,this.content.imagetype,this.content.imagename)
              },(error)=>{}
             )
        },(error)=>{}
       )
    } else {
      this.userservice.getnews("getnews").subscribe(
        (response)=>{
          this.newsarray = response
        },(error)=>{}
       )
       this.userservice.getsectionbysectionid("getsectionbysectionid",4).subscribe(
        (response)=>{
            this.heading = response
        },(error)=>{}
       )
       this.userservice.getsectionbysectionid("getsectionbysectionid",13).subscribe(
        (response)=>{
            this.content = response
            this.filehandle=this.imageservice.bytetoimage(this.content.imgvid,this.content.imagetype,this.content.imagename)
        },(error)=>{}
       )
    }
   }
  heading : Section = new Section()
  content : Section = new Section()
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


  currentImageIndex : number = 0
  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.newsarray.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.newsarray.length) %
      this.newsarray.length;
  }
}



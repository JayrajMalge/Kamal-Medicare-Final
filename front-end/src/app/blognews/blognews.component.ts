import { Component ,Input} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { News ,Section} from '../enities';
import { NewsImage } from '../enities';
import { filehandle } from '../enities';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blognews',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './blognews.component.html',
  styleUrl: './blognews.component.css'
})
export class BlognewsComponent {
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private route : ActivatedRoute){}
  news : News = new News()
  newsimages : NewsImage = new NewsImage()
  filehandles : filehandle[] = []
  loginstatus : boolean = false
  heading : Section = new Section()
  headingimage : filehandle = new filehandle()
  ngOnInit(): void {
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{}
    )
    const newsid : number = Number(this.route.snapshot.paramMap.get("newsid"))
    this.userservice.getnewsbynewsid("getnewsbynewsid/"+newsid).subscribe(
      (response)=>{
         this.news = response
      },(error)=>{}
    )
    this.userservice.getnewsimages("getnewsimagesbynewsid/"+newsid).subscribe(
     (response)=>{
         this.newsimages = response
         this.filehandles.push(this.imageservice.bytetoimage(this.newsimages.image,this.newsimages.imagetype,this.newsimages.imagename));
     },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",100).subscribe(
      (response)=>{
          this.heading = response
          this.headingimage=this.imageservice.bytetoimage(this.heading.imgvid,this.heading.imagetype,this.heading.imagename)
      },(error)=>{}
    )
  }

  onheadingchange(event : any){
      const data = event.target.innerHTML
      const s : Section = {
      sectionid : 100,
      heading : data,
      content : this.heading.content,
      imgvid : this.heading.imgvid,
      imagetype : this.heading.imagetype,
      imagename : this.heading.imagename
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
      )
  }
  oncontentchange(event : any){
      const data = event.target.innerHTML
      const s  = {
      sectionid : 100,
      heading : this.heading.heading,
      content : data,
      imgvid : this.heading.imgvid,
      imagetype : this.heading.imagetype,
      imagename : this.heading.imagename
      }
      this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{},(error)=>{}
      )
  }

  triggerFileInput(){
    const fileInput = document.getElementById('visionfileinput') as HTMLInputElement;
    fileInput.click();
  }
  
  onimagechange(event : any){
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
        sectionid : 100,
         heading : this.heading.heading,
         content : this.heading.content,
         imagename : this.heading.imagename,
         imagetype : this.heading.imagetype,
         imgvid :  Array.from(byteArray)
      }
      this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
        },(error)=>{}
      )
    };
  }
}



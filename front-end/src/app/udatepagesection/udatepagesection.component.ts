import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Section } from '../enities';

@Component({
  selector: 'app-udatepagesection',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './udatepagesection.component.html',
  styleUrl: './udatepagesection.component.css'
})
export class UdatepagesectionComponent implements OnInit{

    @Input() operation = ''
    updatemode : boolean = true
    constructor(private userservice : UserServiceService){}
    urls : any[] = []
    ngOnInit(){
      this.urls.push({img :"../../assets/Screenshot (167).png",id : 6,hasimage : true})
      this.urls.push({img :"../../assets/Screenshot (168).png",id : 1,hasimage : true})
      this.urls.push({img :"../../assets/Screenshot (169).png",id : 2,hasimage : false})
      this.urls.push({img :"../../assets/Screenshot (220).png",id : 3,hasimage : false})
      this.urls.push({img :"../../assets/Screenshot (265).png",id : 4,hasimage : false})
      this.urls.push({img :"../../assets/Screenshot (266).png",id : 5,hasimage : false})

    }

    sectiontoshow : Section = new Section()
    selectedSection: number = 0;
    hasimages : boolean = false
    selectSection(img: number) {
      this.hasimages = false
      this.selectedSection = img;
      this.updatemode = false
      this.userservice.getsectionbysectionid("getsectionbysectionid",this.selectedSection).subscribe(
        (response)=>{
           this.sectiontoshow = response
           const url = this.urls.filter((url)=>{
            return url.id == img
           })
           if(url[0].hasimage){
            this.hasimages = true
           }        
      },(error)=>{})
    }

    updatesection(id : number){
       this.userservice.savesection("updatesection",this.sectiontoshow).subscribe(
        (response)=>{alert("Section Updated"); this.sectiontoshow = new Section()},(error)=>{}
       )
    }

    onchange(event : any){
      const file = event.target.files[0];
      this.sectiontoshow.imagename = file.name
      this.sectiontoshow.imagetype = file.type
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer; 
        const byteArray = new Uint8Array(arrayBuffer);
        this.sectiontoshow.imgvid = Array.from(byteArray)
      };
  
      /*if (file) {
        reader.readAsDataURL(file); // Read the file as a Base64 string
      }*/
    }
}

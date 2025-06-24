import { Component, OnInit } from '@angular/core';
import { SpecializationComponent } from '../specialization/specialization.component';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { Section, Specialization, SubSpecialization, filehandle } from '../enities';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specializationbox',
  standalone: true,
  imports: [SpecializationComponent,CommonModule,FormsModule],
  templateUrl: './specializationbox.component.html',
  styleUrl: './specializationbox.component.css'
})
export class SpecializationboxComponent implements OnInit{
  constructor(private userservice : UserServiceService){}
  specializationarray : Specialization[] = []
  subspecializationarray : SubSpecialization[] = []
  loginstatus : boolean = false

  ngOnInit(): void {
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
          this.loginstatus = response.role=='Admin'
      },(error)=>{}
    )
    this.userservice.getspecailizations("getspecializations").subscribe(
      (response)=>{
         this.specializationarray = response
        this.userservice.getspeacializationbyid("getspeacializationbyid",this.specializationarray[0].speacializationid).subscribe(
          (response)=>{this.subspecializationarray = response},(error)=>{}
        )
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",2).subscribe(
      (response)=>{
          this.heading = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",11).subscribe(
      (response)=>{
          this.content = response
      },(error)=>{}
    )
  }

  heading : Section = new Section()
  content : Section = new Section()
  onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 2,
       heading : 'section4heading',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }
  oncontentchange(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 11,
       heading : 'section4content',
       content : data
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
        
      },(error)=>{}
    )
  }

  /*currentImageIndex : number = 0
  nextImage() {
    if (this.specializationarray.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.specializationarray.length;
    }
  }
  
  prevImage() {
    if (this.specializationarray.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.specializationarray.length) % this.specializationarray.length;
    }
  }*/

  selectedItem: number | null = null;

  selectItem(item: number): void {
    this.selectedItem = item;
    this.userservice.getspeacializationbyid("getspeacializationbyid",this.selectedItem).subscribe(
      (response)=>{this.subspecializationarray = response},(error)=>{}
    )
  }
  
}

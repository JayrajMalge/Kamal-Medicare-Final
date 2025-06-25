import { Component, OnInit,HostListener } from '@angular/core';
import { DoctorBoxComponent } from '../doctor-box/doctor-box.component';
import { UserServiceService } from '../user-service.service';
import { Doctor, Section, Specialization } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageServiceService } from '../image-service.service';

@Component({
  selector: 'app-doctorsbox',
  standalone: true,
  imports: [DoctorBoxComponent,FormsModule,CommonModule],
  templateUrl: './doctorsbox.component.html',
  styleUrl: './doctorsbox.component.css'
})
export class DoctorsboxComponent implements OnInit{
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService){}
  doctorarray : Doctor[] =  []
  specializationarray : Specialization[] = []
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
      },(error)=>{}
    )
    this.userservice.getdoctors("getdoctors").subscribe(
      (response)=>{
         this.doctorarray = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",3).subscribe(
      (response)=>{
          this.heading = response
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",12).subscribe(
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
    sectionid : 3,
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
    sectionid : 12,
    heading : 'section4content',
    content : data
  }
  this.userservice.savesection("updatesection",s).subscribe(
    (response)=>{
      
    },(error)=>{}
  )
  } 

  currentImageIndex : number = 0
  selecteddoctor : Doctor = this.doctorarray[this.currentImageIndex]
  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.doctorarray.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.doctorarray.length) %
      this.doctorarray.length;
  }

  selectedItem: number | null = null;

  Doctors : Doctor[] = []
  selectItem(item: number): void {
    this.selectedItem = item;
    this.userservice.getdocspeacializations("getdoctorspecializationbysubspecializationid",item).subscribe(
      (response)=>{
        response.map((res)=>{
          this.Doctors.push(res.doctor)
        })
      },(error)=>{}
     )
  }

  
  currentIndex = 0;
  itemsPerPage = 3;
  windowWidth = window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
    this.calculateItemsPerPage();
  }

  calculateItemsPerPage() {
    if (this.windowWidth < 768) {
      this.itemsPerPage = 1;
    } else if (this.windowWidth < 992) {
      this.itemsPerPage = 2;
    } else {
      this.itemsPerPage = 3;
    }
  }

  get visibleItems() {
    const start = this.currentIndex * this.itemsPerPage;
    return this.Doctors.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.Doctors.length / this.itemsPerPage);
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.totalPages - 1) {
      this.currentIndex++;
    }
  }

  goToPage(index: number) {
    if (index >= 0 && index < this.totalPages) {
      this.currentIndex = index;
    }
  }
}





import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SpeacializationpagefullComponent } from '../speacializationpagefull/speacializationpagefull.component';
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService  } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { ActivatedRoute } from '@angular/router';
import { Doctor, DoctorSpecialization, Specialization, SubSpecialization, filehandle } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctorBoxComponent } from '../doctor-box/doctor-box.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-speacializationpage',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule,DoctorBoxComponent],
  templateUrl: './speacializationpage.component.html',
  styleUrl: './speacializationpage.component.css'
})
export class SpeacializationpageComponent implements OnInit{
   constructor(private route : ActivatedRoute,private userservice : UserServiceService,private imageservice : ImageServiceService,public san : DomSanitizer){}
   specialization : Specialization = new Specialization()
   subspecialization : SubSpecialization[] = []

   currentimages : filehandle[] = []
   Doctors : DoctorSpecialization[] = []
   mainspinner : boolean = false

   ngOnInit(): void {
    this.mainspinner = true
    const speid : number = Number(this.route.snapshot.paramMap.get("speacializationid"))
    const subspe : number = Number(this.route.snapshot.paramMap.get("subspe"))
    this.userservice.getspebyid("getspecializationbyid/"+speid).subscribe(
      (response)=>{
        this.specialization = response
        this.userservice.getspeacializationbyid("getspeacializationbyid",speid).subscribe(
          (response)=>{
            this.subspecialization = response
            if(subspe!=0){
              this.selectedspe = this.subspecialization.filter((spe)=>{return spe.subspeacializationid==subspe})[0]
              this.userservice.getsubspeacializationimagesvideobyid("getsubspeacializationimagesvideobyid/"+this.selectedspe.subspeacializationid).subscribe(
                (response)=>{
                  response.map((res)=>{
                    this.currentimages.push(this.imageservice.bytetoimage(res.imagevideo,res.imagetype,res.imagename))
                  })
                  this.userservice.getdocspeacializations("getdoctorspecializationbysubspecializationid",this.selectedspe.speacialization.speacializationid).subscribe(
                    (response)=>{
                      this.Doctors = response
                      this.mainspinner = false
                    },(error)=>{}
                   )
                },(error)=>{}
              )
            } else {
              this.selectedspe = this.subspecialization[0]
              this.userservice.getsubspeacializationimagesvideobyid("getsubspeacializationimagesvideobyid/"+this.selectedspe.subspeacializationid).subscribe(
                (response)=>{
                  response.map((res)=>{
                    this.currentimages.push(this.imageservice.bytetoimage(res.imagevideo,res.imagetype,res.imagename))
                  })
                  console.log(response)
                  this.userservice.getdocspeacializations("getdoctorspecializationbysubspecializationid",this.selectedspe.speacialization.speacializationid).subscribe(
                    (response)=>{
                      this.Doctors = response
                    },(error)=>{}
                   )
                },(error)=>{}
              )
            }
          },(error)=>{}
        )
      },(error)=>{}
    )
   }

  selectedItem: number | null = null;
  selectedspe : SubSpecialization = new SubSpecialization()
  selectItem(item: number): void {
    this.selectedItem = item;
    this.currentimages = [] 
    this.selectedspe= this.subspecialization.filter((spe)=>{
      return spe.subspeacializationid == this.selectedItem
    })[0]
    this.userservice.getsubspeacializationimagesvideobyid("getsubspeacializationimagesvideobyid/"+this.selectedspe.subspeacializationid).subscribe(
      (response)=>{
        console.log(response)
        response.map((res)=>{
          this.currentimages.push(this.imageservice.bytetoimage(res.imagevideo,res.imagetype,res.imagename))
        })
        this.userservice.getdocspeacializations("getdoctorspecializationbysubspecializationid",this.selectedspe.speacialization.speacializationid).subscribe(
          (response)=>{
            this.Doctors = response
          },(error)=>{}
         )
      },(error)=>{}
    )
  }

  currentIndex = 0;
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.currentimages.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.currentimages.length) % this.currentimages.length;
  }

  autoPlay(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); 
  }

}

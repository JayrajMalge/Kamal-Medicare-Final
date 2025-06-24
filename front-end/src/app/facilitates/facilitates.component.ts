import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService } from '../user-service.service';
import { ActivatedRoute } from '@angular/router';
import { Facility, FacilityImage, filehandle ,Section} from '../enities';
import { ImageServiceService } from '../image-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facilitates',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule],
  templateUrl: './facilitates.component.html',
  styleUrl: './facilitates.component.css'
})
export class FacilitatesComponent implements OnInit{
  facility : Facility = new Facility()
  facilitiesimages : filehandle[] = []

  constructor(private userservice : UserServiceService,private route : ActivatedRoute,private imageservice : ImageServiceService){}
   ngOnInit(): void {
    const facid : number = Number(this.route.snapshot.paramMap.get("facilitesid"))
    this.userservice.getfacilitybyfacilityid("getfacilitesbyfacilityid",facid).subscribe(
      (response)=>{
         this.facility = response
         this.userservice.getfacilitesimagesbyfacilityid("getfacilitesimagesbyfacilityid/"+this.facility.facilitesid).subscribe(
          (response)=>{
            response.map((res)=>{
              this.facilitiesimages.push(this.imageservice.bytetoimage(res.image,res.imagetype,res.imagename))
            })
          },(error)=>{}
         )
      },(error)=>{}
    )
   }

   currentImageIndex = 0;

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.facilitiesimages.length) % this.facilitiesimages.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.facilitiesimages.length;
  }
}


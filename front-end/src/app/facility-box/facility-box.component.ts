import { Component, Input, OnInit } from '@angular/core';
import { Facility, FacilityImage, filehandle } from '../enities';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';

@Component({
  selector: 'app-facility-box',
  standalone: true,
  imports: [],
  templateUrl: './facility-box.component.html',
  styleUrl: './facility-box.component.css'
})
export class FacilityBoxComponent implements OnInit{
  @Input() facility : Facility = new Facility()
  Facilityimages : FacilityImage[] = []
  filehandle : filehandle = new filehandle()
  constructor(private imagesservice : ImageServiceService,private userservice : UserServiceService){}
  ngOnInit(): void {
    this.userservice.getfacilitesimagesbyfacilityid("getfacilitesimagesbyfacilityid/"+this.facility.facilitesid).subscribe(
    (response)=>{
        this.Facilityimages = response
        this.filehandle = this.imagesservice.bytetoimage(this.Facilityimages[0].image,this.Facilityimages[0].imagetype,this.Facilityimages[0].imagename)
    },(error)=>{})
  }
}

import { Component ,Input, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Facility, FacilityImage, filehandle } from '../enities';
import { ImageServiceService } from '../image-service.service';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-addupdate-facilite',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,ImageComponent],
  templateUrl: './addupdate-facilite.component.html',
  styleUrl: './addupdate-facilite.component.css'
})
export class AddupdateFaciliteComponent implements OnInit{

  constructor(private userservice : UserServiceService,private router: Router,private imageservice : ImageServiceService){}
    
  facilitesarray : Facility[] = []
  facilitesimagesarray : FacilityImage[] = []
  filehandles : filehandle[] = []
  urls : any[] = []
  ngOnInit(): void {
    this.userservice.getfacilites("getfacilites").subscribe(
      (resposnes)=>{
          this.facilitesarray = resposnes
      },(error)=>{}
    )
  }
  spinner : boolean = true;
  @Input() operation : string = ''
  //facilitname : string = ''
  //facilitdescription : string = ''
  facilityimages : any[] = []
  //facilityType : string = ''

  facility : Facility = new Facility()
  faciltiesimagesinput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.facilityimages = Array.from(files)
    }
  }
  facilitysubmitform(operation : string,form : NgForm){
    if(operation=='Add Facilites'){
      if(form.invalid){
        alert("Fill * mark")
      } else {
        const facility = {
          facilityname : this.facility.facilityname,
          description : this.facility.description,
          availability : this.facility.availability,
          facilitytype : this.facility.facilitytype
        }
        this.userservice.createfacility("savefacilities",facility).subscribe(
          (response)=>{
              const storedfacility = response
              const image = new FormData()
              image.append("facility",storedfacility.facilitesid)
              this.facilityimages.map((img)=>{
                image.append("images",img)
              })
              this.userservice.createfacilitesimage("savefacilitiesimages",image).subscribe(
                (response)=>{
                  alert("Facilit Created Sucessfully")
                  this.facility = new Facility()
                  window.location.reload()
                },(error)=>{
                }
              )
          },(error)=>{
              console.log(error)
          }
        )
      }
    } else {
      if(form.invalid){
         alert("fill * mark")
      } else {
        this.userservice.createfacility("savefacilities",this.facility).subscribe(
          (response)=>{
              const storedfacility = response
              const image = new FormData()
              image.append("facility",storedfacility.facilitesid)
              if(this.facilityimages.length > 0){
                  this.facilityimages.map((img)=>{
                  image.append("images",img)
                })
                this.userservice.setnewfacilitesimages("savenewfacilitesimages",image).subscribe(
                  (response)=>{
                    alert("Facilit Updated Sucessfully")
                    this.facility = new Facility()
                    window.location.reload()
                  },(error)=>{
                    console.log(error)
                  }
                )
              } else {
                alert("Facilit Updated Sucessfully")
                this.facility = new Facility()
                window.location.reload()
              }
              
          },(error)=>{
              console.log(error)
          }
        )
      }
    }
  }

  updatevalue : number = 0
  editmode : boolean = false;
  turneditmode(){
       this.editmode = true
       const facilites = this.facilitesarray.filter((fac)=>{
        return fac.facilitesid == this.updatevalue
       })
       this.facility = facilites[0]
       this.userservice.getfacilitesimagesbyfacilityid("getfacilitesimagesbyfacilityid/"+this.facility.facilitesid).subscribe(
        (response)=>{
            this.facilitesimagesarray = response
            for(let i=0;i<this.facilitesimagesarray.length;i++){
              const filehan = this.imageservice.bytetoimage(this.facilitesimagesarray[i].image,this.facilitesimagesarray[i].imagetype,this.facilitesimagesarray[i].imagename)
              this.filehandles.push(filehan)
              this.urls.push(filehan.url)
            }
        },(error)=>{}
       )
  }



  deletefacilites(){
    this.operation='Confirm Deletion';
    const facilites = this.facilitesarray.filter((fac)=>{
      return fac.facilitesid == this.updatevalue
     })
     this.facility = facilites[0]
     this.userservice.getfacilitesimagesbyfacilityid("getfacilitesimagesbyfacilityid/"+this.facility.facilitesid).subscribe(
      (response)=>{
          this.facilitesimagesarray = response
          for(let i=0;i<this.facilitesimagesarray.length;i++){
            const filehan = this.imageservice.bytetoimage(this.facilitesimagesarray[i].image,this.facilitesimagesarray[i].imagetype,this.facilitesimagesarray[i].imagename)
            this.filehandles.push(filehan)
            this.urls.push(filehan.url)
          }
      },(error)=>{}
     )
  }

  deletefacility(){
    this.userservice.deletebyfacility("deletefaciitybyfacilityid/"+this.facility.facilitesid).subscribe(
      (response)=>{alert("Facility Deleted Sucessfully");window.location.reload()},(error)=>{}
    )
  }


isDialogOpen: boolean = false;

openDialog() {
  this.isDialogOpen = true;
}

handleConfirm() {
  console.log('Confirmed!');
  this.isDialogOpen = false;
}

handleClose() {
  console.log('Dialog closed');
  this.isDialogOpen = false;
}

}

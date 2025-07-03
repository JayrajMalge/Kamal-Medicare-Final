import { Component ,Input, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Facility, FacilityImage, disease, diseaseimages, filehandle } from '../enities';
import { ImageServiceService } from '../image-service.service';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-update-disease',
  standalone: true,
  imports: [FormsModule,CommonModule,ImageComponent],
  templateUrl: './update-disease.component.html',
  styleUrl: './update-disease.component.css'
})
export class UpdateDiseaseComponent {
  constructor(private userservice : UserServiceService,private router: Router,private imageservice : ImageServiceService){}
    
  diseasearray : disease[] = []
  facilitesimagesarray : diseaseimages[] = []
  filehandles : filehandle[] = []
  urls : any[] = []
  ngOnInit(): void {
    this.userservice.getAllcompletediseases("getalldiseases").subscribe(
      (resposnes)=>{
          this.diseasearray = resposnes
      },(error)=>{}
    )
  }
  spinner : boolean = true;
  diseaseimages : any[] = []
  @Input() operation : string = '';

  dis : disease = new disease()
  faciltiesimagesinput(event: any): void {
    const files = event.target.files;
    if (files && files.length > 1) {
      this.diseaseimages = Array.from(files)
    }
  }
  facilitysubmitform(operation : string){
    if(operation=='Add Disease'){
      const newdis = {
        name : this.dis.name,
        description : this.dis.description,
      }
      this.userservice.savedisease("setnewdisease",newdis).subscribe(
        (response)=>{
            const storeddis = response
            const image = new FormData()
            image.append("disid",storeddis.diseaseid)
            this.diseaseimages.map((img)=>{
              image.append("images",img)
              console.log(img.image)
              this.userservice.savediseaseimages("setnewdiseaseimages",image).subscribe(
                (response)=>{
                  alert("Disease Created Sucessfully")
                },(error)=>{}
              )
            })
        },(error)=>{
            console.log(error)
        }
      )
    } else {
      this.userservice.savedisease("setnewdisease",this.dis).subscribe(
        (response)=>{
          if(this.diseaseimages.length > 0){
            const storeddis = response
            this.diseaseimages.map((img)=>{
            const image = new FormData()
              image.append("disid",storeddis.diseaseid)
              image.append("images",img.image)
              this.userservice.savediseaseimages("updatediseaseimages",image).subscribe(
                (response)=>{
                  alert("Update Sucessfully")
                  this.editmode = false
                  window.location.reload()
                },(error)=>{
                }
              )
            })
          } else {
            alert("Update Sucessfully")
            window.location.reload()
          }
        },(error)=>{
            console.log(error)
        }
      )
    }
  }

  updatevalue : number = 0
  editmode : boolean = false;
  turneditmode(){
       this.editmode = true
       this.dis = this.diseasearray.filter((dis)=>{
        return dis.diseaseid == this.updatevalue
       })[0]
       this.userservice.getdiseaseimagesbydisease("getalldiseasesimages",this.dis.diseaseid).subscribe(
        (response)=>{
          console.log(response)
          response.map((res)=>{
            this.urls.push(this.imageservice.bytetoimage(res.image,res.imagetype,res.imagename))
          })
        },(error)=>{}
       )
  }



  deletefacilites(){
    this.operation='Confirm Deletion';
    const disease = this.diseasearray.filter((dis)=>{
      return dis.diseaseid == this.updatevalue
     })
     this.dis = disease[0]
     this.userservice.getdiseaseimagesbydisease("getalldiseasesimages",this.dis.diseaseid).subscribe(
      (response)=>{
          this.diseaseimages = response
          for(let i=0;i<this.diseaseimages.length;i++){
            const filehan = this.imageservice.bytetoimage(this.diseaseimages[i].image,this.diseaseimages[i].imagetype,this.diseaseimages[i].imagename)
            this.filehandles.push(filehan)
            this.urls.push(filehan.url)
          }
      },(error)=>{}
     )
  }

  deletefacility(){
    this.userservice.deletedisease("deletedisease/"+this.dis.diseaseid).subscribe(
      (response)=>{alert("Disease Deleted Successfully");window.location.reload()
    },(error)=>{}
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

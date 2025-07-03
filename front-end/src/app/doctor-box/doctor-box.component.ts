import { Component, Input, OnInit } from '@angular/core';
import { Doctor, DoctorSpecialization, filehandle } from '../enities';
import { ImageServiceService } from '../image-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-doctor-box',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-box.component.html',
  styleUrl: './doctor-box.component.css'
})
export class DoctorBoxComponent implements OnInit{

  @Input() doc : Doctor = new Doctor()

  doctorspecializations : any = new DoctorSpecialization()
  constructor(private imageservice : ImageServiceService,private userservice : UserServiceService){}
  filehandle : filehandle = new filehandle()
  ngOnInit() {
   this.filehandle = this.imageservice.bytetoimage(this.doc.profilephotot,this.doc.imagetype,this.doc.imagename)
    this.userservice.getdocspeacializations("getspecializationsbydoctorid",this.doc.doctorid).subscribe(
      (response)=>{
        this.doctorspecializations = response[0]
      },(error)=>{}
    )
  }
}

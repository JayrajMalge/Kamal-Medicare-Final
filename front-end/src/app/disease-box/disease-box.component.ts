import { Component, OnInit,Input } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { News, NewsImage, disease, diseaseimages, filehandle } from '../enities';
import { ImageServiceService } from '../image-service.service';

@Component({
  selector: 'app-disease-box',
  standalone: true,
  imports: [],
  templateUrl: './disease-box.component.html',
  styleUrl: './disease-box.component.css'
})
export class DiseaseBoxComponent {
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService){}
  @Input() dis : disease = new disease()
  disimages : diseaseimages[] = []
  filehandle : filehandle = new filehandle()
  ngOnInit(): void {
    this.userservice.getdiseaseimagesbydisease("getalldiseasesimages",this.dis.diseaseid).subscribe(
     (response)=>{
         this.disimages = response
         this.filehandle = this.imageservice.bytetoimage(this.disimages[0].image,this.disimages[0].imagetype,this.disimages[0].imagename)
     },(error)=>{}
    )
  }
}

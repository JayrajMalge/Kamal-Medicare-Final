import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserServiceService  } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiseaseBoxComponent } from '../disease-box/disease-box.component';
import { CommonModule } from '@angular/common';
import { disease, diseaseimages,filehandle } from '../enities';


@Component({
  selector: 'app-disease-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,DiseaseBoxComponent,FormsModule,CommonModule],
  templateUrl: './disease-page.component.html',
  styleUrl: './disease-page.component.css'
})
export class DiseasePageComponent {
  dis : disease = new disease()
  disimages : filehandle[] = []

  constructor(private userservice : UserServiceService,private route : ActivatedRoute,private imageservice : ImageServiceService){}
   ngOnInit(): void {
    const disid : number = Number(this.route.snapshot.paramMap.get("diseaseid"))
    this.userservice.getdiseasebydiseaseid("getdiseasebydiseaseid",disid).subscribe(
      (response)=>{
        this.dis = response
         this.userservice.getdiseaseimagesbydisease("getalldiseasesimages",this.dis.diseaseid).subscribe(
          (response)=>{
            response.map((res)=>{
              this.disimages.push(this.imageservice.bytetoimage(res.image,res.imagetype,res.imagename))
            })
          },(error)=>{}
         )
      },(error)=>{}
    )
   }
}

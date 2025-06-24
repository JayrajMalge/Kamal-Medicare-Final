import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Doctor, DoctorSpecialization, Education, Experience, Patient, Specialization, Treatment, User, filehandle, showcasestudy, showtreatment } from '../enities';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { AppoinmentformComponent } from '../appoinmentform/appoinmentform.component';

@Component({
  selector: 'app-doctor-page',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CommonModule,AppoinmentformComponent],
  templateUrl: './doctor-page.component.html',
  styleUrl: './doctor-page.component.css'
})
export class DoctorPageComponent implements OnInit{
  tabs = [
    { label: 'Experenice', content : Experience},
    { label: 'Education', content: Education },
    { label: 'Treatment', content: Treatment },
  ];

  activeTab = 0;
  constructor(private route : ActivatedRoute,private userservice : UserServiceService,private imageservice : ImageServiceService){}

  education : Education[] = []
  experiences : Experience[] = []
  doctor : Doctor = new Doctor()
  doctorspecializations : any = new DoctorSpecialization()
  specializations : any[] = []

  showtreatmentsarray : showtreatment[] = []
  showcasestudiesarray : showcasestudy[] = []

  showtreatment : showtreatment = new showtreatment()
  casestudiesimages : showcasestudy = new showcasestudy()

  treatment : Treatment[] = []
  filehandle : filehandle = new filehandle()
  selectTab(index: number): void {
    this.activeTab = index;
  }
  ngOnInit(): void {
    const doctorid =Number(this.route.snapshot.paramMap.get("doctorid"))
    this.userservice.geteucations("geteducations/"+doctorid).subscribe(
      (response)=>{
          this.education =response
          this.doctor = this.education[0].doctor
          this.filehandle =this.imageservice.bytetoimage(this.doctor.profilephotot,this.doctor.imagetype,this.doctor.imagename)
      },(error)=>{}
    )
    this.userservice.getdocspeacializations("getspecializationsbydoctorid",doctorid).subscribe(
      (response)=>{
         this.doctorspecializations = response
      },(error)=>{}
    )
    this.userservice.getexperiences("getexperience/"+doctorid).subscribe(
      (response)=>{
          this.experiences = response
      },(error)=>{}
    )
    /*this.userservice.gettreatments("gettreatmentbydcotor/"+doctorid).subscribe(
      (response)=>{
        this.treatment = response
        for(let i=0;i<this.treatment.length;i++){
          this.userservice.getcasestudy("getcasestudiesbytreatment/"+this.treatment[i].treatmentid).subscribe(
            (response)=>{
                  this.showtreatment.treatment = this.treatment[i]
                  for(let j=0;j<response.length;j++){
                     this.casestudiesimages.casestudy = response[j]
                     this.userservice.getcasestudyimages("getcasestudiesimagesbycasestudyid/"+response[j].casestudyid).subscribe(
                      (response)=>{
                         response.map((res)=>{
                           this.casestudiesimages.casestudyimages.push(this.imageservice.bytetoimage(res.image,res.imagetype,res.imagename));
                         })
                         //this.casestudiesimages.casestudyimages = response
                         this.showtreatment.casestudiesarray.push(this.casestudiesimages)
                         this.casestudiesimages = new showcasestudy()
                      },(error)=>{}
                     )
                  }
            },(error)=>{}
          )
          this.showtreatmentsarray.push(this.showtreatment)
        }
      },(error)=>{}
    )*/
    
  }

  isappointmentopen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<string>();

  urls : any[] = []
  images : any[] = []
  getallcasestudiesimages(id : number){
    this.userservice.getcasestudyimages("getcasestudiesimagesbycasestudyid/"+id).subscribe(
      (response)=>{
        for(let k=0;k<response.length;k++){
           const filehandle = this.imageservice.bytetoimage(response[k].image,response[k].imagetype,response[k].imagename)
           this.images.push(filehandle.file)
           this.urls.push(filehandle.url)
        }
      },(error)=>{}
    )
  }


  openAppointment() {
    this.isappointmentopen = true;
  }
  handleAppointmentClose() {
    this.isappointmentopen = false;
  }
  handleFormAppointmentSubmit() {
  }
}

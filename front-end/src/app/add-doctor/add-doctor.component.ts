import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule ,FormControl,FormGroup, Validators, FormArray} from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Doctor, DoctorSpecialization, Education, Experience, Facility, filehandle } from '../enities';
import { Router } from '@angular/router';
import { ImageServiceService } from '../image-service.service';
import { ImageComponent } from "../image/image.component";

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ImageComponent],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent implements OnInit{
   
  doctor : FormGroup;
  constructor(private userservice : UserServiceService,private formBuilder : FormBuilder,private  router : Router,private imageservice : ImageServiceService){
    this.doctor = formBuilder.group({
      "doc_name":['',Validators.required],
      "about":['',Validators.required],
      //"doc_email":['',Validators.required],
      //"doc_phone":['',Validators.required],
      //"doc_schedulefrom":['',Validators.required],
      //"doc_scheduleto":['',Validators.required],
      "doc_profile":[null,Validators.required],
      "doc_speacializations":formBuilder.array([]),
      "doc_education":formBuilder.array([]),
      "doc_experience":formBuilder.array([]),
    })
  }
  @Input() operation : string = 'Add Doctor'
  doctoreditmode : boolean = false

  spinner : boolean = true;

  specializationsarray : any[] = []
  doctorsarray : any[] = []
  ngOnInit(): void {
    this.userservice.getdoctors("getdoctors").subscribe(
      (response)=>{
          this.doctorsarray = response
      },(error)=>{}
    )
    this.userservice.getspecailizations("getspecializations").subscribe(
      (response)=>{
        this.specializationsarray=response
      },(error)=>{}
    )
  }

  
  docindex : number = 0;
  get doctor_education(){
    return this.doctor.get("doc_education") as FormArray
  }
  get docspeacialization(){
    return this.doctor.get("doc_speacializations") as FormArray
  }
  adddoctoreducation(){
    const education = this.formBuilder.group({
      "degree":['',Validators.required],
      //"university_name":['',Validators.required],
      //"from_date":[Date,Validators.required],
      //"to_date":[Date,Validators.required]
    })
    this.doctor_education.push(education)
  }
  adddocspeacializations(){
    const speacial = this.formBuilder.group({
      "speacialization":[0,Validators.required]
    })
    this.docspeacialization.push(speacial)
  }
  adddocspeacializationswithparams(speacialization : number,id : number,fieldname : string,doctor : number){
    const speacial = this.formBuilder.group({
      "doctorspeacializationid":[id,Validators.required],
      "speacialization":[speacialization,Validators.required],
      "fieldname":[fieldname,Validators.required],
      "doctor":[doctor,Validators.required]
    })
    this.docspeacialization.push(speacial)
    this.specializationsarray.filter((spe)=>{
      return spe.fieldname!=fieldname
    })
  }
  addeducationparams(id : number,degree : string,university_name : string,from_date : Date,to_date : Date){
    const education = this.formBuilder.group({
      "educationid":[id,Validators.required],
      "degree":[degree,Validators.required],
      //"university_name":[university_name,Validators.required],
      //"from_date":[from_date,Validators.required],
      //"to_date":[to_date,Validators.required]
    })
    this.doctor_education.push(education)
  }
  removeeducation(index : number){
    this.doctor_education.removeAt(index)
    let exp = this.doctor_education.at(index)
   this.userservice.deleteeducation("deletebyeducationid",exp.get("experienceid")?.value).subscribe(
    (response)=>{},(error)=>{}
   )
   this.doctor_experience.removeAt(index)
  }

  get doctor_experience(){
    return this.doctor.get("doc_experience") as FormArray
  }
  addexperience(){
    const experience = this.formBuilder.group({
      "field":['',Validators.required],
      //"hospital_name":['',Validators.required],
      "years":[0,Validators.required],
      //"from_date":[Date,Validators.required],
      //"to_date":[Date,Validators.required]
    })
    this.doctor_experience.push(experience)
  }

  addexperiencewithparams(id : number,field : string,hospital_name : string,years : number,from_date : Date,to_date : Date){
    const experience = this.formBuilder.group({
      "experienceid": [id,Validators.required],
      "field":[field,Validators.required],
      //"hospital_name":[hospital_name,Validators.required],
      "years":[years,Validators.required],
      //"from_date":[from_date,Validators.required],
      //"to_date":[to_date,Validators.required]
    })
    this.doctor_experience.push(experience)
  }

  removeexperience(index : number){
   let exp = this.doctor_experience.at(index)
   this.userservice.deleteexperience("deletebyexperienceid",exp.get("experienceid")?.value).subscribe(
    (response)=>{},(error)=>{}
   )
   this.doctor_experience.removeAt(index)
  }
  
  profileimage : any  = null 
  profileimagename : string  = ''
  profileimagetype : string = ''
  profilephoto(event : any) {
    const file = event.target.files[0];
    this.profileimagename = file.name
    this.profileimagetype = file.type
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer; 
      const byteArray = new Uint8Array(arrayBuffer);
      console.log(byteArray)
      this.profileimage = byteArray
      this.doctor.patchValue({
        doc_profile : Array.from(this.profileimage)
      })
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a Base64 string
    }
  }

  
  doctorsubmit(operations : string,index : number){
    this.spinner = false;
    if(operations=='Add Doctor' && this.profileimagename != '' && this.profileimagetype != ''){
      console.log(this.doctor.valid)
      if(this.doctor.valid){
        const values = this.doctor.value;
        const doctor: any = {
          name: values.doc_name,
          //about: values.doc_about,
          //email: values.doc_email,
          //phone: values.doc_phone,
          //schedulefrom: String(values.doc_schedulefrom),
          //scheduleto: String(values.doc_scheduleto),
          //joindate: new Date(),
          about : values.about,
          profilephotot : Array.from(this.profileimage),
          imagename : this.profileimagename,
          imagetype : this.profileimagetype,
          resigndate: null
        };
        this.userservice.createdoctor("savedoctor",doctor).subscribe(
          (resposnes)=>{
            const doc : Doctor = resposnes
            const experiences : any[] = values.doc_experience;
            const educations : any[] = values.doc_education;
            const speacials : any[] = values.doc_speacializations;
            speacials.map((spe)=>{
                const doctorspeacializations : any = {
                  doctor : doc.doctorid,
                  speacialization : spe.speacialization,
                }
                this.userservice.createdoctorspeacializations("savedcospe",doctorspeacializations).subscribe(
                  (response)=>{},(error)=>{}
                )
            })
            experiences.map((exp)=>{
                const singlexperence : any = {
                  field : exp.field,
                  //hospitalname : exp.hospital_name,
                  years: exp.years,
                  //fromdate: exp.from_date,
                  //todate: exp.to_date,
                  doctor: doc.doctorid
                }
                this.userservice.createexperience("saveexperience",singlexperence).subscribe((response)=>{},(error)=>{})
            })
            educations.map((edu)=>{
                const singleeducation : any ={
                  degree : edu.degree,
                  //universityname:edu.university_name,
                  //fromdate: edu.from_date,
                  //todate: edu.to_date,
                  doctor: doc.doctorid
                }
                this.userservice.createeducation("saveeducation",singleeducation).subscribe(
                  (resposnes)=>{

                  },(error)=>{}
                )
            })
          },(error)=>{}
        )
        this.doctor.reset()
        alert("Doctor Updated Sucessfully")
        window.location.reload()
      } else{
        alert("Please fill all information having * mark")
      }
    } 
    else{
      alert("Please fill all information having * mark ")
    }
    if(operations=='Update Doctor'){
      const values = this.doctor.value;
      const doctor: any = {
        doctorid : this.docindex,
        name: values.doc_name,
        //about: values.doc_about,
        //email: values.doc_email,
        //phone: values.doc_phone,
        //schedulefrom: String(values.doc_schedulefrom),
        //scheduleto: String(values.doc_scheduleto),
        //joindate: new Date(),
        about : values.about,
        profilephotot : values.doc_profile,
        imagename : this.profileimagename,
        imagetype : this.profileimagetype,
        //resigndate: null
      };
      this.userservice.updatedoctor("updatedoctor",doctor).subscribe(
        (resposnes)=>{
           const doc : any = resposnes
           const experiences : any[] = values.doc_experience;
           const educations : any[] = values.doc_education;
           const speacials : any[] = values.doc_speacializations;
           speacials.map((spe)=>{
              const doctorspeacializations : any = {
                doctorspeacializationid : spe.doctorspeacializationid,
                doctor : doc.doctorid,
                speacialization : spe.speacialization
              }
              this.userservice.updatedocspeacialization("updatedocspeacialization",doctorspeacializations).subscribe(
                (resposnes)=>{},(error)=>{}
              )
           })
           experiences.map((exp)=>{
               const singlexperence : any = {
                experienceid : exp.experienceid,
                field : exp.field,
                //hospitalname : exp.hospital_name,
                years: exp.years,
                //fromdate: exp.from_date,
                //todate: exp.to_date,
                doctor: doc.doctorid
               }
               this.userservice.updateexperience("Updateexperience",singlexperence).subscribe((response)=>{},(error)=>{})
           })
           educations.map((edu)=>{
              const singleeducation : any ={
                educationid : edu.educationid,
                degree : edu.degree,
                //universityname:edu.university_name,
                //fromdate: edu.from_date,
                //todate: edu.to_date,
                doctor: doc.doctorid
              }
              this.userservice.updateeducation("updateeducation",singleeducation).subscribe(
                (resposnes)=>{},(error)=>{}
              )
           })
           alert("Doctor Updated Sucessfully")
          window.location.reload()
        },(error)=>{}
      )
      this.doctor.reset()
    } else{

    }
    this.spinner = true;
  }

  doctordata : any[] = []
  updatevalue : any
  filehandle : filehandle = new filehandle();


  turneditmode(field : string,event : any){
    this.doctoreditmode = true
    this.spinner = false
    if(field=='Doctor'){
      const doctor = this.doctorsarray.at(this.updatevalue)
      this.docindex = doctor.doctorid;
      this.profileimage =doctor.profilephotot
      this.profileimagetype = doctor.imagetype
      this.profileimagename = doctor.imagename
      this.filehandle = this.imageservice.bytetoimage(doctor.profilephotot,doctor.imagetype,doctor.imagename)
      this.images.push(this.filehandle.url)
      //let doctorspe : any[];
      this.userservice.getdocspeacializations("getspecializationsbydoctorid",doctor.doctorid).subscribe(
        (response)=>{
           this.doctordata = response
           this.doctordata.map((doc)=>{
             this.adddocspeacializationswithparams(doc.speacialization.speacializationid,doc.doctorspeacializationid,doc.speacialization.fieldname,doc.doctor)
           })
        },(error)=>{}
      )
      this.doctor.patchValue({
        doc_name : doctor.name,
        //doc_about : doctor.about,
        //doc_email: doctor.email,
        //doc_phone: doctor.phone,
        //doc_schedulefrom : doctor.schedulefrom,
        //doc_scheduleto : doctor.scheduleto,
        about : doctor.about,
        doc_profile: this.profileimage,
      })
      this.userservice.geteucations("geteducations/"+doctor.doctorid).subscribe(
        (response)=>{
           const edu : any[] = response
           edu.map((ed)=>{
              this.addeducationparams(ed.educationid,ed.degree,ed.universityname,ed.fromdate,ed.todate)
           })
        },(error)=>{
            console.log(error)
        }
      )
      this.userservice.getexperiences("getexperience/"+doctor.doctorid).subscribe(
        (response)=>{
           const exp : any[] = response
           exp.map((ex)=>{
            this.addexperiencewithparams(ex.experienceid,ex.field,ex.hospitalname,ex.years,ex.fromdate,ex.todate)
           })
        },(error)=>{
          console.log(error)
        }
      )
    }
    this.spinner = true;
  }


  deletedoctor : Doctor = new Doctor()
  deleteexperiences : Experience[] = []
  deleteeducations  : Education[] = []
  deletedoctorspeacializations : DoctorSpecialization[] = []
  deletedoctorprofilephoto : filehandle = new filehandle()
  deletemode(){
    this.operation = 'Confirm Deletion'
    this.deletedoctor = this.doctorsarray.at(this.updatevalue)
    this.deletedoctorprofilephoto = this.imageservice.bytetoimage(this.deletedoctor.profilephotot,this.deletedoctor.imagetype,this.deletedoctor.imagename)
    this.userservice.getdocspeacializations("getspecializationsbydoctorid",this.deletedoctor.doctorid).subscribe(
      (response)=>{
        this.deletedoctorspeacializations = response
      },(error)=>{}
    )
    this.userservice.geteucations("geteducations/"+this.deletedoctor.doctorid).subscribe(
      (response)=>{
        this.deleteeducations = response
      },(error)=>{}
    )
    this.userservice.getexperiences("getexperience/"+this.deletedoctor.doctorid).subscribe(
      (response)=>{
         this.deleteexperiences = response
      },(error)=>{}
    )
  }
  delete(){
    this.userservice.deletedoctor("deletedoctorbydoctorid/"+this.deletedoctor.doctorid).subscribe(
      (response)=>{ alert("Doctor Deleted Sucessfully");window.location.reload()},(error)=>{}
    )
  }

  images : any[] = []
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

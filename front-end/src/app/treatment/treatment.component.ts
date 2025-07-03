import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule ,FormControl,FormGroup, Validators, FormArray} from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { CaseStudy, Doctor, Patient, Treatment, filehandle } from '../enities';
import { Router } from '@angular/router';
import { ImageServiceService } from '../image-service.service';
import { ImageComponent } from '../image/image.component';


@Component({
  selector: 'app-treatment',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,ImageComponent],
  templateUrl: './treatment.component.html',
  styleUrl: './treatment.component.css'
})
export class TreatmentComponent implements OnInit{
  treatmentsarray : Treatment[] = []
  doctorsarray : Doctor[] = []
  casestudiesarray : CaseStudy[] = []
  treatmenteditmode : boolean = false
  ngOnInit() {
    this.userservice.getdoctors("getdoctors").subscribe(
      (response)=>{
          this.doctorsarray = response
      },(error)=>{}
    )
    this.userservice.gettreatments("getalltreatments").subscribe(
      (response)=>{
        this.treatmentsarray = response
      },(error)=>{}
    )
    this.userservice.getallcasestudies("getallcasestudies").subscribe(
      (responese)=>{
        this.casestudiesarray = responese
      },(error)=>{}
    )
  }

  updatecasestudyvalue : number = 0
  updatetreatmentvalue : number = 0
  selectedtreatments(){
    this.casestudiesarray = this.casestudiesarray.filter((cas)=>{
      return cas.treatment.treatmentid == this.updatetreatmentvalue;
    }) 

  }


  @Input() operation : string = ''
  treatment : FormGroup;
  constructor(private formBuilder : FormBuilder,private userservice : UserServiceService,private router: Router,private imageservice : ImageServiceService){
    this.treatment = formBuilder.group({
      "title":['',Validators.required],
      "description":['',Validators.required],
      "doctors":formBuilder.array([]),
      //"patientname":['',Validators.required],
      //"patientage":[0,Validators.required],
      //"patientgender":['',Validators.required],
      //"patientmobile":['',Validators.required],
      //"patientaddress":['',Validators.required],
      //"cost":['',Validators.required],
      //"treatmentdate":[Date,Validators.required],
      "casestudies":formBuilder.array([]),
    })
  }

  get doctors(){
    return this.treatment.get("doctors") as FormArray
  }
  
  adddoctor(){
    this.doctors.push(this.formBuilder.group({
      "doctorid":[0,Validators.required]
    }))
  }
  removedoctor(index : number){
    this.doctors.removeAt(index)
  }

  get casestudy(){
    return this.treatment.get("casestudies") as FormArray
  }
  addcasestudies(){
    const casestd = this.formBuilder.group({
      "casestudytitle":['',Validators.required],
      "casestudydescription":['',Validators.required],
      "casestydyresult":['',Validators.required],
      "dataofcase":[Date,Validators.required],
      "casestudiesimages":this.formBuilder.array([])
    })
    this.casestudy.push(casestd)
  }
  addcasestudieswithparam(casestudyid : Number,casestudytitle : string,casestudydescription : string,casestydyresult : string,dataofcase : Date){
    const casestd = this.formBuilder.group({
      "casestudyid":[casestudyid,Validators.required],
      "casestudytitle":[casestudytitle,Validators.required],
      "casestudydescription":[casestudydescription,Validators.required],
      "casestydyresult":[casestydyresult,Validators.required],
      "dataofcase":[dataofcase,Validators.required],
      "casestudiesimages":this.formBuilder.array([])
    })
    this.casestudy.push(casestd)
  }

  casestudyimagearray(index : number) : FormArray{
    return this.casestudy.at(index).get("casestudiesimages") as FormArray
  }

  casestudyimages : any[] = []
  casestydyimages(event : any,index : number) : void{
    const files : any[] = event.target.files
    this.casestudyimages = files
    for(let i=0;i<files.length;i++){
      //this.casestudyimagearray(index).push(this.formBuilder.control(files[i]))
      this.casestudyimagearray(index).push(this.formBuilder.group(
        {
          "file":files[i]
         }
       ))
    }
  }
  removecasestudy(index : number){
    this.casestudy.removeAt(index)
  }
  casestudysumbmit(operation : string){
    if(operation=='Add Treatments'){
      const values = this.treatment.value
          const treatment = {
            title : values.title,
            description : values.description,
            //patient : storedpatient.patientid,
            //cost : values.cost,
            //treatmentdata : values.treatmentdata
          }
          this.userservice.createtreatment("savedtreatment",treatment).subscribe(
            (response)=>{
               const cases : any[] = values.casestudies
               const storedtreatment = response
               const doctors : any[] = values.doctors
               doctors.map((doc)=>{
                const storedocoftreatments = {
                  doctor : Number(doc.doctorid),
                  treatment : storedtreatment.treatmentid
                }
                this.userservice.storeddoctortreatments("savedoctortreatmentinTreatmentDoctor",storedocoftreatments).subscribe(
                  (response)=>{},(error)=>{}
                )
               })
               cases.map((study)=>{
                  const casty = {
                    treatmentid : storedtreatment.treatmentid,
                    title : study.casestudytitle,
                    description : study.casestudydescription,
                    result : study.casestydyresult,
                    //dateofcase : study.dataofcase
                  }
                  this.userservice.createcasestudy("savedcasestudies",casty).subscribe(
                    (response)=>{
                       const storedcase = response
                       const caseimage : any[] = study.casestudiesimages
                       caseimage.map((img)=>{
                        const data = new FormData()
                        data.append("casestudy",storedcase.casestudyid)
                        data.append("file",img.file);
                        this.userservice.createcasestudyimages("setcasestudiesimages",data).subscribe(
                          (response)=>{alert("Case study Created Sucessfully");this.treatment.reset()},(error)=>{}
                        )
                      })
                    },(error)=>{}
                  )
               })
            },(error)=>{}
          )
          this.treatment.reset()                         
     }
  }  
  




  treatmentform : Treatment = new Treatment()
  Casestudyform : CaseStudy = new CaseStudy()
  //patientform : Patient = new Patient()
  formatedtreatmentdate : string = ''
  images : any[] = []
  updatetreatmentedit(){
    this.operation = "Update Treatment"
    const treatments = this.treatmentsarray.filter((treat)=>{
      return treat.treatmentid == this.updatetreatmentvalue
    })
    this.treatmentform = treatments[0]
    if(this.treatmentform.tratmentdate != null){
      this.formatedtreatmentdate = this.treatmentform.tratmentdate.toString().split('T')[0]
    }
  }

  newimages : any[] = []
  formatedcasedate : string = '';
  getnewcasestudyimages(event : any)
  {
    this.newimages = event.target.files
  }
  updatecasestudyedit(){
    const casestudies = this.casestudiesarray.filter((casestudy)=>{
      return casestudy.casestudyid == this.updatecasestudyvalue
    })
    this.operation = 'Upadate CaseStudy';
    this.Casestudyform = casestudies[0]
    if(this.Casestudyform.dateofcase != null){
      this.formatedcasedate = this.Casestudyform.dateofcase.toString().split('T')[0]
    }
    this.userservice.getcasestudyimages("getcasestudiesimagesbycasestudyid/"+this.Casestudyform.casestudyid).subscribe(
      (response)=>{
        for(let k=0;k<response.length;k++){
           const filehandle = this.imageservice.bytetoimage(response[k].image,response[k].imagetype,response[k].imagename)
           this.images.push(filehandle.file)
           this.urls.push(filehandle.url)
        }
      },(error)=>{}
    )
  }

  upadettreatment(){
          this.userservice.createtreatment("savedtreatment",this.treatmentform).subscribe(
            (response)=>{
               this.treatmentform = new Treatment()
               alert("Treatment Updated Sucessfully")
               window.location.reload()
            },(error)=>{}
          )
  }
  updatecasestudiesform(){
    this.Casestudyform.dateofcase = new Date(this.formatedcasedate)
    this.userservice.createcasestudy("savedcasestudies",this.Casestudyform).subscribe(
      (response)=>{
        if(this.newimages.length > 0){
          const data = new FormData()
          data.append("casestudy",this.Casestudyform.casestudyid.toString())
          for(let k=0;k<this.newimages.length;k++){
             data.append("images",this.newimages[k]);
          }
            this.userservice.createcasestudyimages("savednewcasestudiesimages",data).subscribe(
              (response)=>{this.Casestudyform = new CaseStudy()},(error)=>{}
            )
          }
          alert("Case studies Updated Sucessfully")
          window.location.reload()
      },(error)=>{}
    )
  }


  deletetreatment : Treatment = new Treatment()
  deletedcasestudiesimages : Array<Array<filehandle>> = [[]]
  deletetreatmentmode(){
    this.operation = 'ConfirmDeletion Treatment'
    const treatments = this.treatmentsarray.filter((treat)=>{
      return treat.treatmentid == this.updatetreatmentvalue
    })
    this.deletetreatment = treatments[0]
    if(this.treatmentform.tratmentdate != null){
      this.formatedtreatmentdate = this.treatmentform.tratmentdate.toString().split('T')[0]
    }
    for(let i=0;i<this.casestudiesarray.length;i++){
      this.userservice.getcasestudyimages("getcasestudiesimagesbycasestudyid/"+this.casestudiesarray[i].casestudyid).subscribe(
        (response)=>{
          for(let k=0;k<response.length;k++){
             const filehandle = this.imageservice.bytetoimage(response[k].image,response[k].imagetype,response[k].imagename)
             this.images.push(filehandle.file)
             this.urls.push(filehandle.url)
             this.deletedcasestudiesimages[i].push(filehandle);
          }
        },(error)=>{}
      )
    }
  }

  viewimages(urls : filehandle[]){
    urls.map((ur)=>{
      this.urls.push(ur.url)
    })
    this.openDialog()
  }

  delete(){
    this.userservice.deletetreatment("deletetreatmentbytreatmentid/"+this.deletetreatment.treatmentid).subscribe(
      (response)=>{alert("Treatement Deleted Sucessfully");window.location.reload()},(error)=>{}
    )
  }
  urls : any[]  = []
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


/*
  updatevalue : number = 0;
  index : number = 0
updatetreatment(){
      console.log(this.updatevalue)
      this.treatmenteditmode = true 
      const treatments : Treatment[] = this.treatmentsarray.filter((treatment)=>{
        return treatment.treatmentid == this.updatevalue
      })
      this.index = this.treatmentsarray.indexOf(treatments[0])
      this.treatment.patchValue({
        "title":treatments[0].title,
        "description":treatments[0].description,
        "doctor":treatments[0].doctor,
        "patientname":treatments[0].patient?.name,
        "patientage":treatments[0].patient?.age,
        "patientgender":treatments[0].patient?.gender,
        "patientmobile":treatments[0].patient?.phoneno,
        "patientaddress":treatments[0].patient?.address,
        "cost":treatments[0].cost,
        "treatmentdate":treatments[0].tratmentdate,
      })
      this.userservice.getcasestudy("getcasestudiesbytreatment/"+treatments[0].treatmentid).subscribe(
        (response)=>{
           for(let i=0;i<response.length;i++){
              this.addcasestudieswithparam(
                response[i].casestudyid,
                response[i].title,
                response[i].description,
                response[i].result,
                response[i].dateofcase
              )
              this.userservice.getcasestudyimages("getcasestudiesimagesbycasestudyid/"+response[i].casestudyid).subscribe(
                (response)=>{
                    const images : any[] = []
                    for(let k=0;k<response.length;k++){
                       const filehandle = this.imageservice.bytetoimage(response[k].image,response[k].imagetype,response[k].imagename)
                       images.push(filehandle.file)
                       this.casestudyimageswithparam(i,filehandle.file,response[0].imgid,response[k].casestudy.casestudyid);
                    }
                },(error)=>{}
              )
           }
        },(error)=>{}
      )




       else if(operation=='Update Treatments'){
      const values = this.treatment.value
      console.log(values)
      const patient = {
        patientid : this.treatmentsarray.at(this.index)?.patient?.patientid,
        name : values.patientname,
        age : values.patientage,
        gender : values.patientgender,
        phoneno : values.patientmobile,
        address : values.patientaddress,
      }
      this.userservice.createpatient("savedpatiens",patient).subscribe(
        (response)=>{
          const storedpatient = response
          const treatment = {
            treatmentid : this.treatmentsarray.at(this.index)?.treatmentid,
            title : values.title,
            description : values.description,
            doctor : values.doctor,
            patient : storedpatient.patientid,
            cost : values.cost,
            treatmentdata : values.treatmentdata
          }
          this.userservice.createtreatment("savedtreatment",treatment).subscribe(
            (response)=>{
               const cases : any[] = values.casestudies
               const storedtreatment = response
               cases.map((study)=>{
                  const casty = {
                    treatmentid : storedtreatment.treatmentid,
                    casestudyid : study.casestudyid,
                    title : study.casestudytitle,
                    description : study.casestudydescription,
                    result : study.casestydyresult,
                    dateofcase : study.dataofcase
                  }
                  this.userservice.createcasestudy("savedcasestudies",casty).subscribe(
                    (response)=>{
                       const storedcase = response
                       console.log(study.casestudiesimages)
                       const caseimage : any[] = study.casestudiesimages
                       caseimage.map((img)=>{
                        const data = new FormData()
                        data.append("casestudy",storedcase.casestudyid)
                          data.append("file",img.file);
                          data.append("imgid",img.imgid);
                          console.log(data)
                          this.userservice.createcasestudyimagesput("setcasestudiesimagesput",data).subscribe(
                            (response)=>{
                                this.treatment.reset()                         
                            },(error)=>{}
                          )
                      })
                    },(error)=>{}
                  )
               })
            },(error)=>{}
          )
        },(error)=>{}
      )
    }
  }*/
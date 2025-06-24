import { CommonModule } from '@angular/common';
import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule ,FormControl,FormGroup, Validators, FormArray} from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Specialization, SubSpecialization, SubSpecializationimgvideo, filehandle, filemaking } from '../enities';
import { Router } from '@angular/router';
import { ImageServiceService } from '../image-service.service';
import { ImageComponent } from '../image/image.component';
import { QuillModule } from 'ngx-quill';



@Component({
  selector: 'app-addupdate-speacialization',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,ImageComponent,QuillModule],
  templateUrl: './addupdate-speacialization.component.html',
  styleUrl: './addupdate-speacialization.component.css'
})
export class AddupdateSpeacializationComponent {
  specializationsarray : Specialization[] = []
  subspecializationarray : SubSpecialization[] = []
  doctorsarray : any[] = []
  specialization_des : string = ''

  speacializationeditmode : boolean = false
  specialityeditmode : boolean = false

  ngOnInit(): void {
    this.userservice.getdoctors("getdoctors").subscribe(
      (response)=>{
          this.doctorsarray = response
      },(error)=>{}
    )
    this.userservice.getallsubspecialization("getallsubspeacialization").subscribe(
      (response)=>{
        this.subspecializationarray = response
      },(error)=>{}
    )
    this.userservice.getspecailizations("getspecializations").subscribe(
      (response)=>{
        this.specializationsarray=response
      },(error)=>{}
    )
  }
  
  specializations(){
    const id = this.updatedspeciality;
    this.userservice.getspeacializationbyid("getspeacializationbyid",id).subscribe(
      (response)=>{
          this.subspecializationarray = response
      },(error)=>{}
    )
  }

  change_specialization_des(event : any){
    this.specialization_des =  event.target.innerHTML
  }

  @Input() operation : string = 'Add Doctor'
  specialization : FormGroup;
  constructor(private formBuilder : FormBuilder,private userservice : UserServiceService,private router: Router,private imageservice : ImageServiceService){
    this.specialization = formBuilder.group({
      "name": ['',Validators.required],
      "description":['',Validators.required],
      "subspecializationarray":formBuilder.array([])
    })
  }
  speacializationarraybyindex(index : number){
    return this.specaili_zation.at(index).get("subspecializationimages") as FormArray
  }
  
  subSpecializationimages : any[] = [];
  bytearrayimages : any[] = []
  get specaili_zation(){
    return this.specialization.get("subspecializationarray") as FormArray
  }

  addspeacilization(){
    const singlespecialization = this.formBuilder.group({
      "subspecializationname":['',Validators.required],
      "subspecializationabout":['',Validators.required],
      "subspecializationimages": this.formBuilder.array([])
    })
    this.specaili_zation.push(singlespecialization)
  }
  addspeacilizationwithparams(id : number,name : string,about : string){
    const singlespecialization = this.formBuilder.group({
      "subspeacializationid":[id,Validators.required],
      "subspecializationname":[name,Validators.required],
      "subspecializationabout":[about,Validators.required],
      "subspecializationimages":[null,Validators.required]
    })
    this.specaili_zation.push(singlespecialization)
  }

  updatedfile : boolean = false;
  spinner : boolean = true;

  onFileChange(event: any, index: number): void {
    console.log(index)
    this.updatedfile = true
    const file : any[] = event.target.files;
    for(let i=0;i<file.length;i++){
      this.getsubspecializationimages(index).push(this.formBuilder.group(
        {
         "file":file[i]
        }
      ))
    }
  }
  getsubspecializationimages(index : number) : FormArray{
    return this.specaili_zation.at(index).get("subspecializationimages") as FormArray
  }

  changewithparama(index : number,file : any,subspeacialization : number,subspeacializationimagesid : number){
    console.log(index)
    this.getsubspecializationimages(index).push(this.formBuilder.group({
      "subspeacializationimagesid":[subspeacializationimagesid,Validators.required],
      "subspeacialization":[subspeacialization,Validators.required],
      "file": file,
    }))
  }

  removeSubSpecialization(index: number): void {
    this.specaili_zation.removeAt(index);
  }

  specializationsubmit(operation : string){
    if(operation=='Add Specialization'){
      this.specialization.patchValue({
        description: this.specialization_des,
      })
       if(this.specialization.valid){
        const values =  this.specialization.value
        const specialization : any = {
            fieldname : values.name,
            description : values.description
        }
        this.userservice.createspecialization("savespeacialization",specialization).subscribe(
         (response)=>{
            const storedspe = response;
            let subspecializations : any[] = values.subspecializationarray
            subspecializations.map((subspe)=>{
               const subsp = {
                 name : subspe.subspecializationname,
                 description : subspe.subspecializationabout,
                 speacialization : storedspe.speacializationid
               }
               this.userservice.createsubspecialization("savesubspeacialization",subsp).subscribe(
                 (response)=>{
                    const storedsubspe = response
                    console.log(subspe.subspecializationimages);
                    for(let i=0;i<subspe.subspecializationimages.length;i++){
                      const subspeacializationimagesvideo = new FormData();
                      subspeacializationimagesvideo.append("subspeacializationid",storedsubspe.subspeacializationid);
                      subspeacializationimagesvideo.append("file",subspe.subspecializationimages[i].file);
                      this.userservice.createsubspecializationimgvid("savesubspeacializationimgvid",subspeacializationimagesvideo).subscribe(
                       (response)=>{
                        alert("Specialization Created Sucessfully")
                        window.location.reload()
                       },(error)=>{}
                      )
                     }
                 },(error)=>{}
               )
            })
         },(error)=>{
           console.log(error)
         }
        )
        
      } else {
        alert("Plases fill all * marked information")
       }
    } 
  }
  imagetobyte(file : any){
     
  }

  updatedspeciality : number = 0
  updatedspecialization : number = 0
  hasimages : boolean = false;
  turnspecializationeditmode(){
    this.operation = 'Update specailization'
    const sub : SubSpecialization[] = this.subspecializationarray.filter((subspe)=>{
      return subspe.subspeacializationid == this.updatedspecialization
    })
    this.subspecializationform.subspeacializationid = sub[0].subspeacializationid
    this.subspecializationform.name = sub[0].name
    this.subspecializationform.description = sub[0].description
    this.subspecializationform.speacialization = sub[0].speacialization
    this.userservice.getsubspeacializationimagesvideobyid("getsubspeacializationimagesvideobyid/"+sub[0].subspeacializationid).subscribe(
      (response)=>{
          if(response.length>0){
            this.hasimages = true;
            for(let k=0;k<response.length;k++){
              const filehandle = this.imageservice.bytetoimage(response[k].imagevideo,response[k].imagetype,response[k].imagename)
              const form = new FormData()
              form.append("subspeacializationid",sub[0].subspeacializationid.toString())
              form.append("imgvid",response[k].subspeacializationimagesid.toString())
              const file : any = filehandle.file
              form.append("file",file)
              this.images.push({"file":filehandle.file,"url":filehandle.url})
              this.urls.push(filehandle.url)
            }
          }

      },(error)=>{}
    )
  }

  turnspecialityeditmode(){
    this.operation = 'Update specaility' 
    const spea = this.specializationsarray.filter((spe)=>{
      return spe.speacializationid == this.updatedspeciality
    })
    //this.speacialization.speacializationid = spea[0].speacializationid
    //this.speacialization.fieldname = spea[0].fieldname
    //this.speacialization.description = spea[0].description
    //
    this.specialization.patchValue({
      name: spea[0].fieldname,
      speacializationid : spea[0].speacializationid,
      description:spea[0].description,
      subspecializationarray :this.formBuilder.array([])
    })
    this.specialization_des = spea[0].description
  }

  speacialization : Specialization = new Specialization()
  updatespeacility(){
    const values =  this.specialization.value
       const specialization : Specialization = {
           speacializationid : this.updatedspeciality,
           fieldname : values.name,
           description : values.description
       }
       this.userservice.createspecialization("savespeacialization",specialization).subscribe(
        (response)=>{
           const storedspe = response;
           let subspecializations : any[] = values.subspecializationarray
           subspecializations.map((subspe)=>{
              const subsp = {
                name : subspe.subspecializationname,
                description : subspe.subspecializationabout,
                speacialization : storedspe.speacializationid
              }
              this.userservice.createsubspecialization("savesubspeacialization",subsp).subscribe(
                (response)=>{
                   const storedsubspe = response
                   console.log(subspe.subspecializationimages);
                   for(let i=0;i<subspe.subspecializationimages.length;i++){
                     const subspeacializationimagesvideo = new FormData();
                     subspeacializationimagesvideo.append("subspeacializationid",storedsubspe.subspeacializationid);
                     subspeacializationimagesvideo.append("file",subspe.subspecializationimages[i].file);
                     this.userservice.createsubspecializationimgvid("savesubspeacializationimgvid",subspeacializationimagesvideo).subscribe(
                      (response)=>{
                        alert("Specialization Updated Sucessfully")
                        window.location.reload()
                      },(error)=>{}
                     )
                    }
                },(error)=>{}
              )
           })
        },(error)=>{
          console.log(error)
        }
       )
       alert("Specialization Created Sucessfully")
       this.specialization.reset()
  }

  storenewfiles(event : any){
     this.newimages = event.target.files
  }
  subspecializationform : SubSpecialization = new SubSpecialization()
  images : filehandle[] = []
  newimages : any[] = [];
  updatespecializations(event : any){
    event.preventDefault(); // Prevent form submission
    const form = event.target;
    this.subspecializationform.name = form.specializationname.value;
    this.subspecializationform.description = form.specializationdescription.value;
    this.userservice.createsubspecialization("savesubspeacialization",this.subspecializationform).subscribe(
      (response)=>{
        if(this.newimages.length > 0){
          /*const data = {
            "subspeacializationid":this.subspecializationform.subspeacializationid,
            "file":this.newimages,
          }*/
          const data = new FormData()
          data.append("subspeacializationid",this.subspecializationform.subspeacializationid.toString())
          for(let j=0;j<this.newimages.length;j++){
            data.append("file",this.newimages[j])
          }
          this.userservice.createsubspecializationimgvid("setsubspeacializationimgvid",data).subscribe(
            (response)=>{
              alert("Specialization Updated Sucessfully")
              window.location.reload()
            },(error)=>{}
          )
        }
      },(error)=>{}
    )
  }


  deletevalue : number = 0
  deletedurls : any[] = []
  subspeselectedfordeletion(){
    this.userservice.getspeacializationbyid("getspeacializationbyid",this.deletevalue).subscribe(
      (response)=>{
          this.subspecializationarray = response
      },(error)=>{}
    )
  }
  deletemodespeacialization(){
    this.operation = 'Delete Confirm Specialization'
    const spea = this.specializationsarray.filter((spe)=>{
      return spe.speacializationid == this.deletevalue
    })
    this.speacialization.speacializationid = spea[0].speacializationid
    this.speacialization.fieldname = spea[0].fieldname
    this.speacialization.description = spea[0].description
    const sub : SubSpecialization[] = this.subspecializationarray.filter((subspe)=>{
      return subspe.subspeacializationid == this.updatedspecialization
    })
    this.subspecializationform.subspeacializationid = sub[0].subspeacializationid
    this.subspecializationform.name = sub[0].name
    this.subspecializationform.description = sub[0].description
    this.subspecializationform.speacialization = sub[0].speacialization
    this.userservice.getsubspeacializationimagesvideobyid("getsubspeacializationimagesvideobyid/"+sub[0].subspeacializationid).subscribe(
      (response)=>{
          if(response.length>0){
            this.hasimages = true;
            for(let k=0;k<response.length;k++){
              const filehandle = this.imageservice.bytetoimage(response[k].imagevideo,response[k].imagetype,response[k].imagename)
              //const form = new FormData()
              //form.append("subspeacializationid",sub[0].subspeacializationid.toString())
              //form.append("imgvid",response[k].subspeacializationimagesid.toString())
              //form.append("file",file)
              this.images.push({"file":filehandle.file,"url":filehandle.url})
              this.deletedurls.push(filehandle.url)
            }
          }

      },(error)=>{}
    )
  }

  deletepermentaly(){
    console.log(this.speacialization.speacializationid)
    this.userservice.deletespeacialization("deletespecializationbyspeacializationid/"+this.speacialization.speacializationid).subscribe(
      (response)=>{alert("Deleted Sucessfully");window.location.reload()},(error)=>{}
    )
  }
  urls : any[] = []
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




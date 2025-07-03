import { Component, OnInit ,EventEmitter,Input,Output} from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Appointment, Doctor,User ,Section, Specialization} from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appoinmentform',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './appoinmentform.component.html',
  styleUrl: './appoinmentform.component.css'
})
export class AppoinmentformComponent implements OnInit{
  constructor(private userservice : UserServiceService,private  router : Router){}
  doctorarray : Doctor[] =  []
  selecteddoctorid : number = 0
  selectedspecializationid : number = 0
  email : string = ''
  phone : string = ''
  user : User = new User()
  appointment : any = new Appointment()
  specializationarray : Specialization[] = []
  
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<string>();

  loginstatus : boolean = false
  ngOnInit(): void {
    this.userservice.getdoctors("getdoctors").subscribe(
      (response)=>{
         this.doctorarray = response
      },(error)=>{}
    )
    const email = window.localStorage.getItem("email")??''
    this.userservice.getuserbyemail("getbyemail",email).subscribe(
      (response)=>{
        this.user = response
        if(response.role=='Admin'){
          this.loginstatus = true
        }else{
          this.loginstatus = false
        }
      },(error)=>{}
    )
    this.userservice.getsectionbysectionid("getsectionbysectionid",89).subscribe(
      (response)=>{
          this.appointmentsection = response
      },(error)=>{}
    )
    this.userservice.getspecailizations("getspecializations").subscribe(
      (response)=>{
         this.specializationarray = response
      },(error)=>{}
    )
  }


  closeDialog(){
    this.isOpen = false;
    this.close.emit();
  }

  spinner : boolean = true

  appointmentdate : string = ''
  submitapppointment(){
    if(this.phone!=''){
      this.spinner = false  
      this.appointment.doctor = this.selecteddoctorid
      this.appointment.user = this.user
      this.appointment.status = 'Scheduled'
      this.appointment.mobileno = this.phone
      console.log(this.appointment)
      this.userservice.createnewappointment("saveappointment",this.appointment).subscribe(
        (response)=>{this.spinner=true;alert("Appointment Registered");this.closeDialog()},(error)=>{}
      )
    } else{
      alert("Enter Phone Number")
    }
  }
  appointmentsection : Section = new Section()

  oncontentchange(event : any){
      const data = event.target.innerHTML
      const s  = {
        sectionid : 89,
        heading : this.appointmentsection.heading,
        content : data
      }
      this.userservice.savesection("updatesection",s).subscribe(
        (response)=>{
          
        },(error)=>{}
      )
  }

  onheadingchange(event : any){
    const data = event.target.innerHTML
    const s  = {
      sectionid : 89,
      heading : data,
      content : this.appointmentsection.content
    }
    this.userservice.savesection("updatesection",s).subscribe(
      (response)=>{
         
      },(error)=>{}
    )
}
}





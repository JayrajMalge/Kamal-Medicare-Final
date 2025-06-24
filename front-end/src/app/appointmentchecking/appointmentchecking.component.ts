import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Appointment } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-appointmentchecking',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './appointmentchecking.component.html',
  styleUrl: './appointmentchecking.component.css'
})
export class AppointmentcheckingComponent implements OnInit{
  constructor(private userservice : UserServiceService){}
  appointments : Appointment[] = []
   ngOnInit(): void {
     this.userservice.getallappointments("getallappointmentbystatus/"+"Scheduled").subscribe(
      (response)=>{
          this.appointments = response
      },(error)=>{}
     )
   }

   date : Date = new Date()
   acceptappointment(appoint : Appointment){
      appoint.status = 'Completed'
      this.spinner = true
      appoint.appointmentdate = this.date
      this.userservice.createnewappointment("saveappointment",appoint).subscribe(
        (response)=>{alert("Appointment Granted")},(error)=>{}
      )
   }

   spinner : boolean = false
   rejectappointment(appoint : Appointment){
     appoint.status = 'Canceled'
     this.userservice.createnewappointment("saveappointment",appoint).subscribe(
      (response)=>{alert("Appointment Canceled")},(error)=>{}
    )
   }


}

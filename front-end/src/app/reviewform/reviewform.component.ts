import { CommonModule } from '@angular/common';
import { Component ,Input ,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { response } from 'express';
import { Patient } from '../enities';

@Component({
  selector: 'app-reviewform',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reviewform.component.html',
  styleUrl: './reviewform.component.css'
})
export class ReviewformComponent {

  @Input() title: string = 'Submit Your Message';
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<string>();
  formData = {
    name : '',
    message: '',
    phone : 0
  };

   constructor(private userservice : UserServiceService){}

  onSubmit() {
     if(this.patient.patientid != 0){
      let Review : any = {
        patient : this.patient.patientid,
        reviewdescription : this.formData.message
      }
      this.userservice.createreview("createnewreview",Review).subscribe((response)=>{this.closeDialog();alert("Review Submitted Sucessfully")},(error)=>{})
     }
  }

  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }

  valid : boolean = false
  patient : Patient = new Patient()
  checkvaildpatient(){
     console.log(this.formData.name+" "+this.formData.phone)
     const apiUrl = `checkvaildpatient/${this.formData.name}/${this.formData.phone}`;
     if(this.formData.name != '' && this.formData.phone.toString() != ''){
      this.userservice.checkvalidpatient(apiUrl).subscribe(
        (response)=>{
          console.log(response)
            if(response!==null){
              this.patient = response
              if(response.name === this.formData.name && response.phoneno === this.formData.phone.toString()){
                this.valid = true
                console.log(this.valid)
              }
            }
            else{
              this.valid = false
            }
        },(error)=>{}
       )
     }
  }
}

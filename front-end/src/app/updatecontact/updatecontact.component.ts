import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { hospital } from '../enities';

@Component({
  selector: 'app-updatecontact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './updatecontact.component.html',
  styleUrl: './updatecontact.component.css'
})
export class UpdatecontactComponent implements OnInit{
    @Input() operation : string = ''
    mail : hospital = new hospital()
    address : hospital = new hospital()
    mobileno : hospital = new hospital()
    constructor(private userservice : UserServiceService){}
    ngOnInit(): void {
      this.userservice.getuserbyemail("gethospitaldata",'mail').subscribe(
        (response)=>{this.mail = response[0]},(error)=>{}
      )
      this.userservice.getuserbyemail("gethospitaldata","address").subscribe(
        (response)=>{
          this.address = response[0]
        },(error)=>{}
      )
      this.userservice.getuserbyemail("gethospitaldata","mobileno").subscribe(
        (response)=>{this.mobileno = response[0]},(error)=>{}
      )
    }

    submit(){
      this.userservice.updateabout("updatehospital",this.mail).subscribe(
        (response)=>{
          this.mail = new hospital() 
        },(error)=>{}
      )
      
      this.userservice.updateabout("updatehospital",this.address).subscribe(
        (response)=>{
          this.address = new hospital()
        },(error)=>{}
      )
      this.userservice.updateabout("updatehospital",this.mobileno).subscribe(
        (response)=>{
            this.mobileno = new hospital()
        },(error)=>{}
      )
      alert("Upadet Sucessfully")
    }
}

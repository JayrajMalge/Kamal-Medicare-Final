import { CommonModule } from '@angular/common';
import { Component, Host, Input, OnInit } from '@angular/core';
import { hospital } from '../enities';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-updateabout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './updateabout.component.html',
  styleUrl: './updateabout.component.css'
})
export class UpdateaboutComponent implements OnInit{
  @Input() operation : string = ''

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  about : hospital = new hospital();
  mission : hospital  = new hospital()
  vision : hospital = new hospital()
  goal   : hospital = new hospital()
  title : string = ''
  description : string = ''

  missionstr : string = ''
  visiondes : string = ''
  goalstr : string = ''

  url : string = ''
  svg : string = ''
  scoial : hospital = new hospital()

  constructor(private userservice : UserServiceService){}
  ngOnInit(): void {
    this.userservice.getuserbyemail("gethospitaldata",'about').subscribe(
      (response)=>{this.about = response[0]},(error)=>{}
    )
    this.userservice.getuserbyemail("gethospitaldata",'mission').subscribe(
      (response)=>{this.mission = response[0]},(error)=>{}
    )
    this.userservice.getuserbyemail("gethospitaldata",'goal').subscribe(
      (response)=>{this.goal = response[0]},(error)=>{}
    )
    this.userservice.getuserbyemail("gethospitaldata",'vision').subscribe(
      (response)=>{this.vision = response[0]},(error)=>{}
    )
    this.mission.title = "mission"
    this.goal.title = "goal"
    this.vision.title = "vision"
    this.missionstr = this.mission.description
    this.goalstr = this.goal.description
    this.visiondes = this.vision.description
  }

  submit(){
    this.userservice.updateabout("updatehospital",this.about).subscribe(
      (response)=>{
        this.title = ''
        this.description = ''
      },(error)=>{}
    )
    this.mission.description = this.missionstr
    this.userservice.updateabout("updatehospital",this.mission).subscribe(
      (response)=>{
      },(error)=>{}
    )
    this.goal.description = this.goalstr
    this.userservice.updateabout("updatehospital",this.goal).subscribe(
      (response)=>{},(error)=>{}
    )
    this.vision.description = this.visiondes
    this.userservice.updateabout("updatehospital",this.vision).subscribe(
      (response)=>{},(error)=>{}
    )
  }

  submitsociallinks(){
    if(this.scoial.title != ''){
      this.userservice.updateabout("updatehospital",this.scoial).subscribe(
        (response)=>{},(error)=>{}
      )
    }
  }
}

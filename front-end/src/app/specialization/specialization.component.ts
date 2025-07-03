import { Component, Input, OnInit } from '@angular/core';
import { Specialization, SubSpecialization, filehandle } from '../enities';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specialization',
  standalone: true,
  imports: [],
  templateUrl: './specialization.component.html',
  styleUrl: './specialization.component.css'
})
export class SpecializationComponent implements OnInit{
  @Input() Specialization : SubSpecialization = new SubSpecialization()
  filehandleinput : filehandle = new filehandle()
  constructor(private userservice : UserServiceService,private imageservice : ImageServiceService,private route : Router){}
  //specializationarray : Specialization[] = []
  //subspecializationarray : SubSpecialization[] = []
  ngOnInit(): void {
    /*this.userservice.getallsubspecialization("getallsubspeacialization").subscribe(
      (response)=>{
        this.subspecializationarray = response
      },(error)=>{}
    )*/
  }

  viewspecializations(Specialization : SubSpecialization){
    let rout  = "/subspe/"+Specialization.speacialization.speacializationid+"/"+Specialization.subspeacializationid
    this.route.navigate([rout])
  }
}

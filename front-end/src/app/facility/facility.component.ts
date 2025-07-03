import { Component, OnInit } from '@angular/core';
import { FacilitatesComponent } from '../facilitates/facilitates.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FacilityBoxComponent } from '../facility-box/facility-box.component';
import { UserServiceService } from '../user-service.service';
import { ImageServiceService } from '../image-service.service';
import { Facility, Section, filehandle } from '../enities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facility',
  standalone: true,
  imports: [FacilitatesComponent, HeaderComponent, FooterComponent, FacilityBoxComponent, FormsModule, CommonModule],
  templateUrl: './facility.component.html',
  styleUrl: './facility.component.css'
})
export class FacilityComponent implements OnInit
{
  constructor(private userservice: UserServiceService, private imageservice: ImageServiceService) { }
  facilites: Facility[] = []
  loginstatus: boolean = false
  filehandle: filehandle = new filehandle()
  mainspinner: boolean = false
  ngOnInit()
  {
    this.mainspinner = true
    const email = window.localStorage.getItem("email") ?? ''
    this.userservice.getuserbyemail("getbyemail", email).subscribe(
      (response) =>
      {
        this.loginstatus = response.role == 'Admin'
      }, (error) => { }
    )
    this.userservice.getfacilites("getfacilites").subscribe(
      (response) =>
      {
        this.facilites = response
        this.userservice.getsectionbysectionid("getsectionbysectionid", 22).subscribe(
          (response) =>
          {
            this.facilitysection = response
            this.filehandle = this.imageservice.bytetoimage(this.facilitysection.imgvid, this.facilitysection.imagetype, this.facilitysection.imagename)
            this.mainspinner = false
          }, (error) => { }
        )
      }, (error) => { }
    )
  }
  facilitysection: Section = new Section()
  onheadingchange(event: any)
  {
    const data = event.target.innerHTML
    console.log(data)
    const s = {
      sectionid: 22,
      heading: data,
      content: this.facilitysection.content,
      imagename: this.facilitysection.imagename,
      imagetype: this.facilitysection.imagetype,
      imgvid: this.facilitysection.imgvid
    }
    this.userservice.savesection("updatesection", s).subscribe(
      (response) => { }, (error) => { }
    )
  }
  oncontentchange(event: any)
  {
    const data = event.target.innerHTML
    const s = {
      sectionid: 22,
      heading: this.facilitysection.heading,
      content: data
    }
    this.userservice.savesection("updatesection", s).subscribe(
      (response) =>
      {

      }, (error) => { }
    )
  }

  onwelcomechange(event: any)
  {
    const file = event.target.files[0];
    this.facilitysection.imagename = file.name
    this.facilitysection.imagetype = file.type
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () =>
    {
      const arrayBuffer = reader.result as ArrayBuffer;
      const byteArray = new Uint8Array(arrayBuffer);
      this.facilitysection.imgvid = Array.from(byteArray)
      const s = {
        sectionid: 22,
        heading: this.facilitysection.heading,
        content: this.facilitysection.content,
        imagename: this.facilitysection.imagename,
        imagetype: this.facilitysection.imagetype,
        imgvid: Array.from(byteArray)
      }
      this.userservice.savesection("updatesection", s).subscribe(
        (response) =>
        {
        }, (error) => { }
      )
    };
  }

  triggerFileInput()
  {
    const fileInput = document.getElementById('welcomefileinput') as HTMLInputElement;
    fileInput.click();
  }
}




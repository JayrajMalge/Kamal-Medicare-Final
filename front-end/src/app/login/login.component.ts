import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription ,interval } from 'rxjs';
import { User } from '../enities';
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnDestroy{
  constructor(private usersevice : UserServiceService,private route : Router){}
  email : string = '';
  optstatus : boolean = true;
  sendingotp : boolean = true;
  otp : number = 0

  timervalue : number = 60
  timerstatus : boolean = true
  timersubcription : Subscription | null = null
  optbuttontext : string = 'Get OTP';

  ngOnInit(): void {
    (window as any).handleCredentialResponse = (response: any) => {
      this.handleGoogleSignIn(response);
    };
  }
  
  sendOtp(){
    if(this.optbuttontext == "Get OTP"){
        this.sendingotp=false;
        this.usersevice.sendOTP("sendOTPtoemail",this.email).subscribe(
          (response)=>{
            this.optstatus = false
            this.optbuttontext = 'Verfiy'
            this.sendingotp=true
            const timer = interval(1000)
            this.timerstatus = false
            this.timersubcription = timer.subscribe(()=>{
                if(this.timervalue > 0){
                  this.timervalue--;
                }else{
                  this.stoptimer
                }
            })
            console.log(response)
          } ,(error)=>{
           console.log(error)
          }
        )
    }
    else if(this.optbuttontext == "Verfiy"){
      const onetime : string =""+this.otp;
      const otpdeatail = {
        email : this.email,
        otp : this.otp
      }
      this.usersevice.verfiyotp("emailverfication",this.email,onetime).subscribe(
        (response)=>{
          window.localStorage.setItem("email",this.email);
          this.route.navigate(['/main'])
        } ,(error)=>{
         console.log(error)
        }
      )
    }
  }

  stoptimer(){
    this.timersubcription?.unsubscribe()
    this.timerstatus = true
  }
  ngOnDestroy(): void {
    this.stoptimer()
  }

  handleGoogleSignIn(response: any) {
    const decodedToken = this.parseJwt(response.credential);
    console.log('Decoded Token:', decodedToken);
    let user : User = new User()
    user.email = decodedToken.email
    user.role = 'Visitor'
    user.updateat = new Date()
    user.createat = new Date()
    user.username = decodedToken.email
    this.usersevice.saveuser("saveuser",user).subscribe(
      (response)=>{
          this.route.navigate(['/main'])
          window.localStorage.setItem("email",decodedToken.email)
        },(error)=>{}
    )
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

}

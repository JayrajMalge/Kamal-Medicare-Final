import { Injectable } from '@angular/core';
import { WebClientService } from './web-client.service';
import { HttpParams } from '@angular/common/http';
import { Appointment, CaseStudy, CaseStudyImage, Doctor, DoctorSpecialization, Education, Experience, Facility, FacilityImage, News, NewsImage, Patient, Review, Section, Specialization, SubSpecialization, SubSpecializationimgvideo, Treatment, TreatmentDoctor, User, disease, diseaseimages, hospital } from './enities';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  API_URL = "http://localhost:5000/"
  constructor(private webclient:WebClientService) { }
  public loginwithgoogle(url:string){
    return this.webclient.get<any>(url);
  }

  public sendOTP(url : string,email : string){
     return this.webclient.get<any>(url+"/"+email)
  }

  public verfiyotp(url : string,otp : string,email : string){
    const loginData = new HttpParams()
      .set('email', email)
      .set('otp', otp)
    return this.webclient.post<typeof loginData,any>(url,loginData)
  }

  public getuserbyemail(url : string,email : string){
    return this.webclient.get<any>(url+"/"+email)
  }

  public getdoctors(url : string){
    return this.webclient.get<any>(url);
  }
  public getfacilites(url : string){
    return this.webclient.get<Facility[]>(url);
  }
  public getspecailizations(url : string){
    return this.webclient.get<Specialization[]>(url);
  }
  public geteucations(url : string){
    return this.webclient.get<any>(url);
  }
  public getexperiences(url : string){
    return this.webclient.get<any>(url);
  }

  public createdoctor(url : string,data : any){
    return this.webclient.post<typeof Doctor,any>(url,data)
  }
  
  public createexperience(url : string,data : any){
    return this.webclient.post<typeof Experience,any>(url,data)
  }
  
  public createeducation(url : string,data : any){
    return this.webclient.post<typeof Education,any>(url,data)
  }

  public createspecialization(url : string,data : any){
    return this.webclient.post<typeof Specialization,any>(url,data)
  }

  public createsubspecialization(url : string,data : any){
    return this.webclient.post<typeof SubSpecialization,any>(url,data)
  }

  public createsubspecializationimgvid(url : string,data : any){
    return this.webclient.post<typeof SubSpecializationimgvideo,any>(url,data)
  }

  public createfacility(url : string,data : any){
    return this.webclient.post<typeof Facility,any>(url,data)
  }

  public createfacilitesimage(url : string,data : any){
    return this.webclient.post<typeof FacilityImage,any>(url,data)
  }

  public createtreatment(url : string,data : any){
     return this.webclient.post<typeof Treatment,any>(url,data)
  }

  public createcasestudy(url : string,data : any){
    return this.webclient.post<typeof CaseStudy,any>(url,data)
  }

  public createpatient(url : string,data : any){
    return this.webclient.post<typeof Patient,any>(url,data)
  }

  public createcasestudyimages(url : string,data : any){
    return this.webclient.post<typeof CaseStudyImage,any>(url,data)
  }

  public createdoctorspeacializations(url : string,data : any){
    return this.webclient.post<typeof DoctorSpecialization,any>(url,data)
  }
  
  public createnews(url : string,data : any){
    return this.webclient.post<typeof News,any>(url,data)
  }

  public createnewsimage(url : string,data : any){
    return this.webclient.post<typeof NewsImage,any>(url,data)
  }

  public getdocspeacializations(url : string,doctorid : Number){
    return this.webclient.get<DoctorSpecialization[]>(url+"/"+doctorid)
  }

  public updatedoctor(url : string,doctor : any){
    return this.webclient.put(url,doctor)
  }

  public updateexperience(url : string,experience : any){
    return this.webclient.put<typeof Experience,any>(url,experience)
  }

  public updateeducation(url : string,education : any){
    return this.webclient.put<typeof Education,any>(url,education)
  }

  public getspeacializationbyid(url : string,id : number){
    return this.webclient.get<SubSpecialization[]>(url+"/"+id)
  }
  public updatedocspeacialization(url : string,docspeacialization : any){
    return this.webclient.put<typeof DoctorSpecialization,any>(url,docspeacialization)
  }
  public getsubspeacializationimagesvideobyid(url : string){
    return this.webclient.get<any[]>(url)
  }

  public gettreatments(url : string){
    return this.webclient.get<Treatment[]>(url)
  }

  public getcasestudy(url : string){
    return this.webclient.get<CaseStudy[]>(url)
  }

  public getcasestudyimages(url : string){
    return this.webclient.get<CaseStudyImage[]>(url)
  }

  public getallsubspecialization(url : string){
    return this.webclient.get<SubSpecialization[]>(url)
  }

  public createcasestudyimagesput(url : string,data : any){
    return this.webclient.put<typeof CaseStudyImage,any>(url,data)
  }
  
  public setnewspecializationimages(url : string,data : any){
    return this.webclient.post(url,data)
  }

  public getallcasestudies(url : string)
  {
    return this.webclient.get<CaseStudy[]>(url)
  }

  public getpatientbytreatmentid(url : string)
  {
    return this.webclient.get<Patient>(url)
  }

  public getfacilitesimagesbyfacilityid(url : string)
  {
    return this.webclient.get<FacilityImage[]>(url)
  }

  public setnewfacilitesimages(url : string,data : any){
    return this.webclient.post(url,data)
  }

  public checkvalidpatient(url : string){
    return this.webclient.get<Patient>(url)
  }
  public deletedoctor(url : string){
    return this.webclient.delete(url)
  }

  public deletespeacialization(url : string){
    return this.webclient.delete(url)
  }

  public deletebyfacility(url : string){
    return this.webclient.delete(url);
  }

  public deletetreatment(url : string){
    return this.webclient.delete(url)
  }

  public createreview(url : string,data : any)
  {
    return this.webclient.post(url,data)
  }
  public getreviews(url : string)
  {
    return this.webclient.get<Review[]>(url)
  }

  public getnews(url : string)
  {
    return this.webclient.get<News[]>(url)
  }

  public getnewsimages(url : string)
  {
    return this.webclient.get<NewsImage>(url)
  }
  public getspebyid(url : string){
    return this.webclient.get<Specialization>(url)
  }

  public getanyspeacialization(url : string)
  {
    return this.webclient.get<SubSpecialization>(url)
  }

  public getdoctorspecialization(url : string,specializationid : number){
    return this.webclient.get<Doctor>(url+"/"+specializationid)
  }
  
  public getnewsbynewsid(url : string){
    return this.webclient.get<News>(url)
  }

  public updateabout(url : string,data : any){
   return  this.webclient.post<typeof hospital,any>(url,data)
  }

  public getfacilitybyfacilityid(url : string,facilityid : number){
    return this.webclient.get<Facility>(url+"/"+facilityid)
  }

  public getsectionbysectionid(url : string,sectionid : number)
  {
    return this.webclient.get<Section>(url+"/"+sectionid)
  }

  public getsectionbyheading(url : string,heading : string)
  {
    return this.webclient.get<Section>(url+"/"+heading)
  }


  public savesection(url : string,data : any)
  {
    return this.webclient.post<typeof Section,any>(url,data)
  }

  public deletepatient(url : string){
    return this.webclient.delete<any>(url)
  }

  public deletenews(url : string){
    return this.webclient.delete(url)
  }

  public createnewappointment(url : string,data : any)
  {
    return this.webclient.post<typeof Appointment,any>(url,data)
  }

  public getallappointments(url : string)
  {
    return this.webclient.get<Appointment[]>(url)
  }


  public getAllcompletediseases(url : string)
  {
    return this.webclient.get<disease[]>(url)
  }
  public getalldiseaseimages(url : string)
  {
    return this.webclient.get<diseaseimages[]>(url)
  }
  public deletedisease(url : string)
  {
    return this.webclient.delete(url)
  }
  public getdiseaseimagesbydisease(url : string,id : number)
  {
    return this.webclient.get<diseaseimages[]>(url+"/"+id)
  }
  public savedisease(url : string,data : any)
  {
    return this.webclient.post<typeof disease,any>(url,data)
  }
  
  public savediseaseimages(url : string,data : any)
  {
    return this.webclient.post<typeof diseaseimages, any>(url,data)
  }

  public getdiseasebydiseaseid(url : string,id : number)
  {
    return this.webclient.get<disease>(url+"/"+id)
  }

  public getspecializationsbyfieldname(url : string,name : string)
  {
    return this.webclient.get<Specialization[]>(url+"/"+name)
  }

  public getdiseasebyfieldname(url : string,name : string)
  {
    return this.webclient.get<disease[]>(url+"/"+name)
  }

  public deleteeducation(url : string,id : number){
    return this.webclient.delete(url+"/"+id)
  }

  public deleteexperience(url : string,id : number){
    return this.webclient.delete(url+"/"+id)
  }

  public saveuser(url : string,user : any){
    return this.webclient.post<typeof User,any>(url,user)
  }

  public storeddoctortreatments(url : string,data : any){
    return this.webclient.post<any,any>(url,data)
  }
}


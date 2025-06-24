import { SafeResourceUrl, SafeUrl } from "@angular/platform-browser";
import { blob } from "stream/consumers";

// appointment.entity.ts
export class Appointment {
    appointmentid!: number;
    user?: User;
    doctor?: Doctor;
    appointmentdate?: Date;
    status?: 'Scheduled' | 'Completed' | 'Canceled';
    mobileno : string = ''
  }
  
  // casestudy.entity.ts
  export class CaseStudy {
    casestudyid: number = 0;
    treatment: Treatment = new Treatment();
    title: string = '';
    description: string = '';
    result: string = '';
    dateofcase: Date = new Date();
  }
  
  // casestudy-image.entity.ts
  export class CaseStudyImage {
    imgid : number = 0;
    casestudy : CaseStudy = new CaseStudy(); 
    image: any[] = [];
    imagetype : string = '';
    imagename : string = '';
  }
  
  // doctor.entity.ts
  export class Doctor {
    doctorid!: number;
    name?: string;
    about?: string;
    email?: string;
    phone?: number;
    profilephotot? : Blob;
    schedulefrom?: string;
    scheduleto?: string;
    joindate?: Date;
    imagename : string = '';
    imagetype : string = '';
    resigndate?: Date;
  }
  
  // doctor-specialization.entity.ts
  export class DoctorSpecialization {
    doctorspeacializationid!: number;
    doctor : Doctor = new Doctor();
    speacialization : Specialization = new Specialization();
  }
  
  export class TreatmentDoctor {
    doctortreatmentid: number =0;
    doctor : number = 0;
    treatment : Treatment = new Treatment();
  }

  // education.entity.ts
  export class Education {
    educationid!: number;
    degree?: string;
    universityname?: string;
    fromdate?: Date;
    todate?: Date;
    doctor: Doctor = new Doctor();
  }
  
  // experience.entity.ts
  export class Experience {
    experienceid!: number;
    field?: string;
    hospitalname?: string;
    years?: number;
    fromdate?: Date;
    todate?: Date;
    doctor: Doctor = new Doctor();
  }
  
  // facility.entity.ts
  export class Facility {
    facilitesid : number = 0;
    facilityname: string = '';
    description: string = '';
    availability : 'yes' | 'no' = 'yes';
    facilitytype : string = '';
  }
  
  // facility-image.entity.ts
  export class FacilityImage {
    imgid: number = 0;
    image: Blob = new Blob();
    facility : Facility = new Facility();
    imagename : string = '';
    imagetype : string = '';
  }
  
  // faq.entity.ts
  export class FAQ {
    faquestionid!: number;
    user?: number;
    question?: string;
    answer?: string;
    creatat?: Date;
    answerat?: Date;
  }
  
  // news.entity.ts
  export class News {
    newsid!: number;
    title?: string;
    description?: string;
    newsdate?: Date;
    newstype? : string;
  }
  
  // news-image.entity.ts
  export class NewsImage {
    newsid?: number;
    news? : News = new News();
    image?: Blob;
    imagename : string = '';
    imagetype : string = '';
  }
  
  // page.entity.ts
  export class Page {
    pageid!: number;
    tittle?: string;
    description?: string;
    slug?: string;
    createat?: Date;
    updateat?: Date;
  }
  
  // patient.entity.ts
  export class Patient {
    patientid? : number = 0;
    name?: string = '';
    age?: number = 0;
    gender?: 'Male' | 'Female' = 'Male';
    phoneno?: string = '123456';
    address?: string = '';
  }
  
  // section.entity.ts
  export class Section {
    sectionid!: number;
    heading: string = '';
    content: string = '';
    imgvid: any;
    imagename : string = '';
    imagetype : string = '';
  }
  
  // section-media.entity.ts
  export class SectionMedia {
    sectionimgid!: number;
    imgdata?: Blob;
    viddata?: Blob;
  }
  
  // specialization.entity.ts
  export class Specialization {
    speacializationid: number = 0;
    fieldname: string = '';
    description: string = '';
  }
  
  // sub-specialization.entity.ts
  export class SubSpecialization {
    subspeacializationid : number = 0;
    name: string = '';
    description: string = '';
    speacialization: Specialization = new Specialization();
  }
  
  // treatment.entity.ts
  export class Treatment {
    treatmentid: number = 0;
    title: string = '';
    description: string = '';
    doctor: number = 0;
    cost: number = 0;
    tratmentdate: Date = new Date();
  }
  
  // user.entity.ts
  export class User {
    userid!: number;
    username?: string;
    hashedpassword?: string;
    email?: string;
    role?: 'Admin' | 'Visitor';
    createat?: Date;
    updateat?: Date;
  }
  
  export class SubSpecializationimgvideo{
    subspecialization : SubSpecialization = new SubSpecialization()
    imgvid? : number = 0;
    imagevideo : any;
    imagename : string = '';
    imagetype : string = '';
  }

  export class filehandle{
       file? : File;
       url? : SafeResourceUrl;
  }

  export class filemaking {
      files : File[] = [];
      uniqueid : number = 0
      referenceid : number = 0;
  }

  export class Review{
    reviewid : number = 0
    patient : Patient = new Patient();
    reviewdescription : string = ''
  }

  export class showtreatment{
    treatment : Treatment = new Treatment();
    casestudiesarray : showcasestudy[] = []; 
  } 

  export class showcasestudy{
    casestudy : CaseStudy = new CaseStudy();
    casestudyimages : filehandle[] = []
  }

  export class hospital{
    id : number = 0;
    title : string = '';
    description : string = ''; 
  }

  export class disease{
    diseaseid : number=0;
    name : string = '';
    description : string = ''
  }

  export class diseaseimages{
    diseaseimageid : number = 0;
    image : Blob = new Blob();
    imagename : string = ''
    imagetype : string = ''
    disease : disease = new disease()  
  }

package web.hospital.backend.controllers;
 
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import web.hospital.backend.MailService;
import web.hospital.backend.enities.Appointment;
import web.hospital.backend.enities.Casestudies;
import web.hospital.backend.enities.CasestudiesImages;
import web.hospital.backend.enities.DoctorSpeacialization;
import web.hospital.backend.enities.Facilites;
import web.hospital.backend.enities.FacilitesImages;
import web.hospital.backend.enities.News;
import web.hospital.backend.enities.Newsimage;
import web.hospital.backend.enities.Patient;
import web.hospital.backend.enities.Review;
import web.hospital.backend.enities.Section;
import web.hospital.backend.enities.Speacialization;
import web.hospital.backend.enities.Subspeacialization;
import web.hospital.backend.enities.Subspeacializationimagesvideo;
import web.hospital.backend.enities.Treatment;
import web.hospital.backend.enities.User;
import web.hospital.backend.repositiories.appointmentRepository;
import web.hospital.backend.repositiories.casestudiesimagesRepository;
import web.hospital.backend.repositiories.casestudyRepository;
import web.hospital.backend.repositiories.doctorRepository;
import web.hospital.backend.repositiories.doctorSpeacializationRepository;
import web.hospital.backend.repositiories.educationRespository;
import web.hospital.backend.repositiories.experienceRespository;
import web.hospital.backend.repositiories.facilitesRepository;
import web.hospital.backend.repositiories.facilitesimagesRepository;
import web.hospital.backend.repositiories.newsRepository;
import web.hospital.backend.repositiories.newsimageRepository;
import web.hospital.backend.repositiories.patientRepository;
import web.hospital.backend.repositiories.reviewsRespository;
import web.hospital.backend.repositiories.sectionRepository;
import web.hospital.backend.repositiories.specializationRepository;
import web.hospital.backend.repositiories.subspecializationRepository;
import web.hospital.backend.repositiories.subspecializationimavideoRepository;
import web.hospital.backend.repositiories.treatmentRepository;
import web.hospital.backend.repositiories.userRepository;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class fetchController {
    @Autowired
    private treatmentRepository treatments;
    
    @Autowired 
    private casestudyRepository casestudies;
    
    @Autowired 
    private casestudiesimagesRepository casestudiesimages;
    
    @Autowired
    private subspecializationimavideoRepository subspecializationimavideos;
    
     @Autowired
    private subspecializationRepository subspeacializations;
     
    @Autowired 
    private  patientRepository patients;
    
    @Autowired
    private facilitesimagesRepository facilitesimages;
    
     @Autowired
    private experienceRespository experiences;
     
    @Autowired
    private doctorRepository doctors;
    
    @Autowired
    private educationRespository educations;
    
    @Autowired
    private specializationRepository speacializations;
    
    @Autowired 
    private doctorSpeacializationRepository doctorSpeacializations;
    
    @Autowired
    private facilitesRepository facilites;
    
    @Autowired
    private reviewsRespository reviews;
    
     @Autowired 
    private newsRepository newss;
    
    @Autowired 
    private newsimageRepository newssimages;
    
    @Autowired 
    private sectionRepository sections;
    
     
    @Autowired 
    private appointmentRepository appointments;
     
    @Autowired
    private MailService emailService;
    
    @Autowired
    private userRepository users; 
    
    @GetMapping("/gettreatmentbytreatmentid/{id}")
    public List<Treatment> gettreatmentbytreatmentid(@PathVariable("id") Integer id){
       return treatments.findByTreatmentid(id);
    } 
   
    
    @GetMapping("/getalltreatments")
    public List<Treatment> getalltreatments(){
       return treatments.findAll();
    }
    
    @GetMapping("/getallcasestudies")
    public List<Casestudies> getallcasestudies(){
        return casestudies.findAll();
    }
    
    @GetMapping("/getcasestudiesbytreatment/{id}")
    public List<Casestudies> getcasestudiesbytreatment(@PathVariable("id") Integer id){
       return casestudies.findByTreatmentid(id);
    } 
    
    @GetMapping("/getcasestudiesimagesbycasestudyid/{casestudyid}")
    public List<CasestudiesImages> getcasestudiesimagesbycasestudyid(@PathVariable("casestudyid") Integer casestudyid){
       return casestudiesimages.findByCasestudy(casestudyid);
    }
        
    @PutMapping("/setcasestudiesimagesput")
    public void setcasestudiesimages(@RequestParam("imgid") String imgid,@RequestParam("file") MultipartFile file,@RequestParam("casestudy") Integer casestudy) throws Exception{
        Casestudies caseimg = casestudies.findByCasestudyid(casestudy);
        CasestudiesImages caseimages = new CasestudiesImages();
        caseimages.setImgid(Integer.parseInt(imgid));
        caseimages.setImage(file.getBytes());
        caseimages.setCasestudy(caseimg);
        caseimages.setImagetype(file.getContentType());
        caseimages.setImagename(file.getOriginalFilename());
        casestudiesimages.save(caseimages);
    }
    
    @PostMapping("/setcasestudiesimages")
    public void setcasestudiesimagespost(@RequestParam("file") MultipartFile file,@RequestParam("casestudy") Integer casestudy) throws Exception{
        Casestudies caseimg = casestudies.findByCasestudyid(casestudy);
        CasestudiesImages caseimages = new CasestudiesImages();
        caseimages.setImage(file.getBytes());
        caseimages.setCasestudy(caseimg);
        caseimages.setImagetype(file.getContentType());
        caseimages.setImagename(file.getOriginalFilename());
        casestudiesimages.save(caseimages);
    }
    
    @PostMapping("/setnewspecializationimages")
    public Integer setnewspecializationimages(@RequestParam("subspecializationid") Integer subspecializationid,@RequestParam("imgvid") Integer imgvid,@RequestParam("file") MultipartFile file){
        try{
          Subspeacialization sub = this.subspeacializations.findBySubspeacializationid(subspecializationid);
          subspecializationimavideos.DeleteBySubspeacialization(subspecializationid);
          Subspeacializationimagesvideo subspeimgvid = new Subspeacializationimagesvideo() ;
          subspeimgvid.setImagename(file.getOriginalFilename());
          subspeimgvid.setImagetype(file.getContentType());
          subspeimgvid.setImagevideo(file.getBytes());
          subspeimgvid.setSubspeacialization(sub);
          subspeimgvid.setSubspeacializationimagesid(imgvid);
          this.subspecializationimavideos.save(subspeimgvid);
        }catch(Exception e){
            
        }
        return 0;
    }
    
    @GetMapping("/getpatientbytreatmentid/{patientid}")
    public Patient  getpatientbytreatmentid(@PathVariable("patientid") Integer patientid)
    {
        return patients.findByPatientid(patientid);
    }
    
    @PostMapping("/savednewcasestudiesimages")
    public void savedcasestudiesimages(@RequestParam("casestudy") Integer casestudy,@RequestParam("images") List<MultipartFile> files){
        try { 
            casestudiesimages.DeleteByCasestudy(casestudy);
            for (MultipartFile file : files) {
                CasestudiesImages casestudyimage = new CasestudiesImages();
                casestudyimage.setCasestudy(casestudies.findByCasestudyid(casestudy));
                casestudyimage.setImagename(file.getOriginalFilename());
                casestudyimage.setImagename(file.getContentType());
                casestudyimage.setImage(file.getBytes());
                 casestudiesimages.save(casestudyimage);
           } 
        }  
        catch(Exception exception){}
    } 
    
    @GetMapping("/getfacilitesimagesbyfacilityid/{facilityid}")
    public List<FacilitesImages> getfacilitesimagesbyfacilityid(@PathVariable("facilityid") Integer facilityid){
       return facilitesimages.findByFacility(facilityid);
    }
    
    @GetMapping("/checkvaildpatient/{name}/{phoneno}")
    public Patient checkvaildpatient(@PathVariable("name") String name,@PathVariable("phoneno") String phoneno){
        return patients.findByNameAndPhoneno(name, phoneno);
    }
    
    @DeleteMapping("/deletedoctorbydoctorid/{doctorid}")
    public void deletedoctorbydoctorid(@PathVariable("doctorid") Integer doctorid)
    {
        doctorSpeacializations.DeleteByDoctor(doctorid);
        educations.DeleteByDoctor(doctorid);
        experiences.DeleteByDoctor(doctorid);
        doctors.DeleteByDoctorid(doctorid);
    } 
    
     @DeleteMapping("/deletespecializationbyspeacializationid/{speacializationid}")
    public void deletespecializationbyspeacializationid(@PathVariable("speacializationid") Integer speacializationid)
    {
        subspecializationimavideos.DeleteBySpeacialization(speacializationid);
        subspeacializations.DeleteBySpeacialization(speacializationid);
        speacializations.DeleteBySpeacializationid(speacializationid);
    }
    
     @DeleteMapping("deletefaciitybyfacilityid/{facilityid}")
    public void deletefaciitybyfacilityid(@PathVariable("facilityid") Integer facilityid)
    {
        facilitesimages.DeleteByFacility(facilityid);
        facilites.DeleteByFacilitesid(facilityid);
    }
    
    @PostMapping("/createnewreview")
    public Review createnewreview(@RequestBody Review review){
        Review re =  reviews.save(review);
        return re;
    }

    
    @GetMapping("/getallreviews")
    public List<Review> getallreview(){
        return reviews.findAll();
    }
    
    @GetMapping("/getspecializationbyid/{speacialization}")
    public Speacialization getspecializationbyid(@PathVariable("speacialization") Integer speacialization){
        return speacializations.findBySpeacializationid(speacialization);
    }
    
    @GetMapping("/getsubspecializationbysubspecializationid/{subspeacializationid}")
    public Subspeacialization getsubspecializationbysubspecializationid(@PathVariable("subspeacializationid") Integer subspeacializationid){
        return subspeacializations.findBySubspeacializationid(subspeacializationid);
    }
    
    @GetMapping("/getdoctorspecializationbysubspecializationid/{speacializationid}")
    public List<DoctorSpeacialization> getdoctorspecializationbysubspecializationid(@PathVariable("speacializationid") Integer speacializationid){
        return doctorSpeacializations.findBySpeacialization(speacializationid);
    }
    
    @GetMapping("/getnewsbynewsid/{newsid}")
    public News getnewsbynewsid(@PathVariable("newsid") Integer newsid){
        return newss.findByNewsid(newsid);
    }
    
    @GetMapping("/getnewsimagesbynewsid/{newsid}")
    public Newsimage getnewsimagesbynewsid(@PathVariable("newsid") Integer newsid){
        return newssimages.findByNewsid(newsid);
    } 
    
    @GetMapping("/getfacilitesbyfacilityid/{facilityid}")
    public Facilites getfacilitesbyfacilityid(@PathVariable("facilityid") Integer facilityid){
        return facilites.findByFacilitesid(facilityid);
    }
    
    @GetMapping("/getsectionbysectionid/{sectionid}")
    public Section getsectionbysectionid(@PathVariable("sectionid") Integer sectionid){
        return sections.findBySectionid(sectionid);
    }
    
    @PostMapping("/updatesection")
    public Section getsectionbysectionid(@RequestBody Section section){
        Section sec = sections.save(section);
        return sec;
    }
    
    @DeleteMapping("/deletepatient/{patientid}")
    public void deletepatient(@PathVariable("patientid") Integer patientid)
    {
        patients.DeleteByPatientid(patientid);
    }
    
    @DeleteMapping("/deletenews/{newsid}")
    public void deletenews(@PathVariable("newsid") Integer newsid)
    {
        newssimages.DeleteByNewsid(newsid);
        newss.DeleteByNewsid(newsid);
    }
    
    @PostMapping("/saveappointment")
    public Appointment saveappointment(@RequestBody Appointment appoint)
    {
       Appointment app =  appointments.save(appoint);
       String email = appoint.getUser().getEmail();
       if(!email.equals("") || email!=null){
           if(appoint.getStatus().equals("Scheduled")){
            this.emailService.sendEmail(email, "You Appointment is Registered for "+app.getDoctor().getName()+" At date "+app.getAppointmentdate(), "Please check email you will get confirmation of your Appointment");
            } else if(appoint.getStatus().equals("Completed")){
                 this.emailService.sendEmail(email, "You Appointment is Confirmed for "+app.getDoctor().getName()+" At date "+app.getAppointmentdate()+"At time "+app.getDoctor().getSchedulefrom()+" to "+app.getDoctor().getScheduleto(), "");
            }else {
                 this.emailService.sendEmail(email, "You Appointment is Canceled for "+app.getDoctor().getName()+" At date "+app.getAppointmentdate(), "Please check email you will get confirmation of your Appointment");
                 this.appointments.DeleteByStatus(appoint.getStatus());
            }
       }
       return app; 
    } 
    
    @GetMapping("/getappointment")
    public List<Appointment> getallappointment(){
        return appointments.findAll();
    }
    
    @GetMapping("/getallappointmentbystatus/{status}")
    public List<Appointment> getallappointmentbystatus(@PathVariable("status") String status){
        return appointments.findByStatus(status);
    }
    
    @GetMapping("/getspecializationbyfieldname/{fieldname}")
    public List<Speacialization> getspecializationbyfieldname(@PathVariable("fieldname") String fieldname){
         return speacializations.findByTitle(fieldname);
    }
    
    @DeleteMapping("deletebyeducationid/{educationid}")
    public void deletebyeducationid(@PathVariable("educationid") Integer educationid)
    {
          educations.DeleteByEducationid(educationid);
    }
    
    @DeleteMapping("deletebyexperienceid/{experienceid}")
    public void deletebyexperienceid(@PathVariable("experienceid") Integer experienceid)
    {
          experiences.DeleteByExperienceid(experienceid);
    }
    
    @PostMapping("/saveuser")
    public User saveuser(@RequestBody User user)
    {
       User use = this.users.findByEmail(user.getEmail());
       if(use==null){
           return this.users.save(user);
       }
       return use;
    }
    
    @GetMapping("/getnewsbynewstype/{newstype}")
    public List<News> getnewsbynewstype(@PathVariable("newstype") String newstype){
         return this.newss.findByNewstype(newstype);
    }
    
    @GetMapping("/getbyheading/{heading}")
    public Section getbyheading(@PathVariable("heading") String heading){
         return this.sections.findByHeading(heading);
    }
    
    @DeleteMapping("deletetreatmentbytreatmentid/{treatmentid}")
    public void deletetreatmentbytreatmentid(@PathVariable("treatmentid") Integer treatmentid){
        this.treatments.DeleteByTreatmentid(treatmentid);
    }
}

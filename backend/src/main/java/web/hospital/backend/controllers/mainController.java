
package web.hospital.backend.controllers;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.security.SecureRandom;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import web.hospital.backend.MailService;
import web.hospital.backend.OTPServices;
import web.hospital.backend.enities.Casestudies;
import web.hospital.backend.enities.CasestudiesImages;
import web.hospital.backend.enities.Doctor;
import web.hospital.backend.enities.DoctorSpeacialization;
import web.hospital.backend.enities.Education;
import web.hospital.backend.enities.Experience;
import web.hospital.backend.enities.Facilites;
import web.hospital.backend.enities.FacilitesImages;
import web.hospital.backend.enities.News;
import web.hospital.backend.enities.Newsimage;
import web.hospital.backend.enities.Patient;
import web.hospital.backend.enities.Speacialization;
import web.hospital.backend.enities.Subspeacialization;
import web.hospital.backend.enities.Subspeacializationimagesvideo;
import web.hospital.backend.enities.Treatment;
import web.hospital.backend.enities.User;
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
import web.hospital.backend.repositiories.specializationRepository;
import web.hospital.backend.repositiories.subspecializationRepository;
import web.hospital.backend.repositiories.subspecializationimavideoRepository;
import web.hospital.backend.repositiories.treatmentRepository;
import web.hospital.backend.repositiories.userRepository;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class mainController {
    @Autowired
    private userRepository users; 
    
    @Autowired
    private MailService emailService;
    
    @Autowired
    private OTPServices otpservices;
    
    @Autowired
    private doctorRepository doctors;
    
    @Autowired
    private experienceRespository experiences;
    
    @Autowired
    private educationRespository educations;
    
    @Autowired
    private specializationRepository speacializations;
    
    @Autowired
    private subspecializationRepository subspeacializations;
    
    @Autowired
    private subspecializationimavideoRepository subspecializationimavideos;
    
    @Autowired
    private facilitesimagesRepository facilitesimages;
    
    @Autowired
    private facilitesRepository facilites;
    
    @Autowired 
    private doctorSpeacializationRepository doctorSpeacializations;
    
    @Autowired 
    private newsRepository newss;
    
    @Autowired 
    private newsimageRepository newssimages;
    
    @Autowired
    private treatmentRepository treatments;
    
    @Autowired 
    private casestudyRepository casestudies;
    
    @Autowired 
    private casestudiesimagesRepository casestudiesimages;
    
    @Autowired 
    private  patientRepository patients;
   
    
    @GetMapping("/index")
    public String indexfile(){
        return "index";
    }
    
    /*@GetMapping("/login/auth")
    public RedirectView view(Model model, @AuthenticationPrincipal OAuth2User principal,HttpServletResponse response) {
        if (principal != null) {
            String user = new String();
            String email = principal.getAttribute("email");
            //System.out.println(email);
            model.addAttribute("email", email); 
            Cookie cookie = new Cookie("kamal_medicare", email);
            cookie.setSecure(true); 
            cookie.setPath("/");
            cookie.setMaxAge(7 * 24 * 60 * 60);
            response.addCookie(cookie);
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl("http://localhost:4200/main");
            return redirectView;
        }
         return null;
        
    }*/
        
    @GetMapping("/getuser")
    public User getusers(){
       return users.findByUsername("jayrajmalge");
    } 
    
    @GetMapping("/sendOTPtoemail/{email}")
    public ResponseEntity<Boolean> SendOTP(@PathVariable("email") String email){
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        emailService.sendEmail(email, "OTP From Kamal Medicare Hospital ", otp+" don't share this OTP");
        String OTP =Integer.toString(otp);
        //redisTemplate.opsForValue().set(email, OTP, Duration.ofMinutes(5));
        otpservices.generateOtp(email, OTP);
        return ResponseEntity.ok(true);        
    } 
    
        @PostMapping( "/emailverfication")
        public ResponseEntity<Boolean> verfity(@RequestParam String email,@RequestParam String otp, HttpServletResponse response)
        {
           String storedOtp = "";
           if(otpservices.verifyOtp(otp, email)){
                User olduser = users.findByEmail(otp);
                if(olduser!=null){
                    Cookie cookie = new Cookie("kamal_medicare", otp);
                    cookie.setSecure(false); 
                    cookie.setHttpOnly(true);
                    cookie.setPath("/");
                    cookie.setMaxAge(7 * 24 * 60 * 60);
                    response.addCookie(cookie);
                }else{
                    User newuser = new User();
                    newuser.setEmail(otp);
                    newuser.setRole("Visitor");
                    System.out.println(otp);
                    String[] usernames = otp.split("@");
                    newuser.setUsername(usernames[0]);
                    users.save(newuser);
                    Cookie cookie = new Cookie("kamal_medicare", otp);
                    cookie.setSecure(false); 
                    cookie.setHttpOnly(true);
                    cookie.setPath("/");
                    cookie.setMaxAge(7 * 24 * 60 * 60);
                    response.addCookie(cookie);
                }
                return ResponseEntity.ok(true);
           }
           return ResponseEntity.ok(false);
        }
        
    @GetMapping("/getbyemail/{email}")
    public User getbyemail(@PathVariable("email") String email){
       return users.findByEmail(email);
    } 
    
    @PostMapping("/savedoctor")
    public Doctor savedoctor(@RequestBody Doctor doctor){
        byte[] imagbytes = doctor.getProfilephotot();
        doctor.setProfilephotot(imagbytes);
        Doctor doc = doctors.save(doctor);
        return doc;
    } 
    
    @PostMapping("/saveexperience")
    public Experience saveexperience(@RequestBody Experience experience){
        Experience exp = experiences.save(experience);
        return exp;
    }  
    
    @PostMapping("/saveeducation")
    public Education saveeducation(@RequestBody Education education){
        Education edu = educations.save(education);
        return edu;
    } 
    
     @PostMapping("/savespeacialization")
    public Speacialization savespeacialization(@RequestBody Speacialization specialization){
        Speacialization spe = speacializations.save(specialization);
        return spe;
    } 
    
     @PostMapping("/savesubspeacialization")
    public Subspeacialization savesubspeacialization(@RequestBody Subspeacialization education){
        Subspeacialization subspe = subspeacializations.save(education);
        return subspe;
    } 
    
    @PostMapping("/savesubspeacializationimgvid")
    public void savesubspeacializationimgvideo(@RequestParam("subspeacializationid") Integer subspeacializationid, @RequestParam("file") List<MultipartFile> files){
        try { 
             for(MultipartFile file : files){
                Subspeacializationimagesvideo subspeimgvid = new Subspeacializationimagesvideo();
                subspeimgvid.setSubspeacialization(subspeacializations.findBySubspeacializationid(subspeacializationid));
                subspeimgvid.setImagevideo(file.getBytes());
                subspeimgvid.setImagetype(file.getContentType());
                subspeimgvid.setImagename(file.getOriginalFilename());
                subspecializationimavideos.save(subspeimgvid);
            }
        } 
        catch(Exception exception){
            System.out.println(exception);
        }
    } 
    
     @PostMapping("/setsubspeacializationimgvid")
    public void setsubspeacializationimgvid(@RequestParam("subspeacializationid") Integer subspeacializationid, @RequestParam("file") List<MultipartFile> files){
        try { 
             int i = subspecializationimavideos.DeleteBySubspeacialization(subspeacializationid);
             System.out.println(i);
             for(MultipartFile file : files){
                Subspeacializationimagesvideo subspeimgvid = new Subspeacializationimagesvideo();
                subspeimgvid.setSubspeacialization(subspeacializations.findBySubspeacializationid(subspeacializationid));
                subspeimgvid.setImagevideo(file.getBytes());
                subspeimgvid.setImagetype(file.getContentType());
                subspeimgvid.setImagename(file.getOriginalFilename());
                subspecializationimavideos.save(subspeimgvid);
            }
        } 
        catch(Exception exception){
            System.out.println(exception);
        }
    } 
   
    
    @PostMapping("/savefacilities")
    public Facilites savefacility(@RequestBody Facilites facilite){
        Facilites fac = facilites.save(facilite);
        return fac;
    } 
                               
    @PostMapping("/savefacilitiesimages")
    public void savefacility(@RequestParam("facility") Integer facility,@RequestParam("images") List<MultipartFile> files){
        try { 
            for (MultipartFile file : files) {
                FacilitesImages fac = new FacilitesImages();
                fac.setFacility(facilites.findByFacilitesid(facility));
                fac.setImage(file.getBytes());
                fac.setImagetype(file.getContentType());
                fac.setImagename(file.getOriginalFilename());
                facilitesimages.save(fac);
           } 
        } 
        catch(Exception exception){}
    } 
    
    @GetMapping("/getdoctors")
    public List<Doctor> getalldoctors(){
        return doctors.findAll();
    }
    
    @GetMapping("/getspecializationsbydoctorid/{doctorid}")
    public List<DoctorSpeacialization> getspecializationsbydoctor(@PathVariable("doctorid") Integer doctorid){
        List<DoctorSpeacialization> doc =doctorSpeacializations.findByDoctor(doctorid);
        return doc;
    }
    
    @GetMapping("/getspecializations")
    public List<Speacialization> getspeacializations(){
        return speacializations.findAll();
    }
    
    @GetMapping("/getfacilites")
    public List<Facilites> getfacilites(){
        return facilites.findAll();
    }
    
    @PostMapping("/savedcospe")
    public DoctorSpeacialization savedcospe(@RequestBody DoctorSpeacialization docspe){
        DoctorSpeacialization docspeacial = doctorSpeacializations.save(docspe);
        return docspeacial;
    } 
    
    @PostMapping("/savednews")
    public News savednews(@RequestBody News nws){
        News nes = newss.save(nws);
        return nes;
    } 
    
    /*@PostMapping("/savednewsimages")
    public Newsimage savednewsimage(@RequestParam("news") Integer news,@RequestParam("images") File files){
        Newsimage nws = new Newsimage();
        nws.setNewsid(newss.findByNewsid(news));
        try { 
             nws.setImage(files.get());
             nws.setImagename(files.getName());
             nws.setImagetype(files.getContentType());
             newssimages.save(nws);
        } 
        catch(Exception exception){}
        return nws;
    }*/
    
    @PostMapping("/savednewsimages")
    public Newsimage savednewsimage(@RequestBody Newsimage newsimg){
        System.out.println(newsimg.getImage());
        Newsimage nws = this.newssimages.save(newsimg);
        return nws;
    }
    
    
    @PostMapping("/savedtreatment")
    public Treatment savedtreatment(@RequestBody Treatment treatment){
        Treatment tre = treatments.save(treatment);
        return tre;
    } 
    
    @PostMapping("/savedcasestudies")
    public Casestudies savedcasestudies(@RequestBody Casestudies casestud){
        Casestudies cases = casestudies.save(casestud);
        return cases;
    } 
    
    @PostMapping("/savedcasestudiesimages")
    public void savedcasestudiesimages(@RequestParam("casestudy") Integer casestudy,@RequestParam("images") List<MultipartFile> files){
        try { 
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
    
    @PostMapping("/savedpatiens")
    public Patient savedpatiens(@RequestBody Patient patient){
        Patient pat = patients.save(patient);
        return pat;
    } 
    
    @GetMapping("/geteducations/{doctorid}")
    public List<Education> geteducations(@PathVariable("doctorid") Integer doctorid){
        return educations.findByDoctorId(doctorid);
    }
    
     @GetMapping("/getexperience/{doctorid}")
    public List<Experience> getexperience(@PathVariable("doctorid") Integer doctorid){
        return experiences.findByDoctorId(doctorid);
    }
    
    @PutMapping("/updatedoctor")
    public Doctor Updatedoctor(@RequestBody Doctor doctor){
        Doctor doc = doctors.save(doctor);
        return doc;
    }
    
    @PutMapping("/updateeducation")
    public Education updateeducation(@RequestBody Education education){
        Education edu = educations.save(education);
        return edu;
    } 
    
    @PutMapping("/Updateexperience")
    public Experience Updateexperience(@RequestBody Experience experience){
        Experience exp = experiences.save(experience);
        return exp;
    }
    
     @PutMapping("/updatedocspeacialization")
    public DoctorSpeacialization Updatedocspeacialization(@RequestBody DoctorSpeacialization dctorspeacialization){
        DoctorSpeacialization dctorspe = doctorSpeacializations.save(dctorspeacialization);
        return dctorspe;
    }
    
    @GetMapping("/getspeacializationbyid/{speacialization}")
    public List<Subspeacialization> getspeacializationbyid(@PathVariable("speacialization") Integer speacialization){
        return subspeacializations.findBySpeacialization(speacialization);
    }
    
    @GetMapping("/getallsubspeacialization")
    public List<Subspeacialization> getallsubspeacialization(){
        return subspeacializations.findAll();
    }
    
     @GetMapping("/getsubspeacializationimagesvideobyid/{subspeacializationbyid}")
    public List<Subspeacializationimagesvideo> getsubspeacializationimagesvideobyid(@PathVariable("subspeacializationbyid") Integer subspeacializationbyid){
        return subspecializationimavideos.findBySubspeacialization(subspeacializationbyid);
    }
    
    @PostMapping("/savenewfacilitesimages")
    public void savenewfacilitesimages(@RequestParam("facility") Integer facility,@RequestParam("images") List<MultipartFile> files){
        this.facilitesimages.DeleteByFacility(facility);
        try { 
            for (MultipartFile file : files) {
                FacilitesImages fac = new FacilitesImages();
                fac.setFacility(facilites.findByFacilitesid(facility));
                fac.setImage(file.getBytes());
                fac.setImagetype(file.getContentType());
                fac.setImagename(file.getOriginalFilename());
                facilitesimages.save(fac);
           } 
        } 
        catch(Exception exception){}
    }
    
    @GetMapping("/getnews")
    public List<News> getnews(){
        return newss.findAll();
    }
    
    @GetMapping("/getnewsimages")
    public List<Newsimage> getnewsimages(){
        return newssimages.findAll();
    }    
 }
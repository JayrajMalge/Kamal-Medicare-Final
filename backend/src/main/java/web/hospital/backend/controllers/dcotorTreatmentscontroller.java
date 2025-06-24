
package web.hospital.backend.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import web.hospital.backend.enities.CasestudiesImages;
import web.hospital.backend.enities.Doctor;
import web.hospital.backend.enities.Treatment;
import web.hospital.backend.enities.Treatmentdoctor;
import web.hospital.backend.repositiories.casestudiesimagesRepository;
import web.hospital.backend.repositiories.doctorstreatments;
import web.hospital.backend.repositiories.sectionRepository;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class dcotorTreatmentscontroller {
    
    @Autowired 
    private doctorstreatments doctortreatments;
    
     @Autowired 
    private casestudiesimagesRepository casestudiesimages;
    
    @GetMapping("/gettreatmentbydcotor/{id}")
    public List<Treatment> gettreatmentbydcotor(@PathVariable("id") Integer id){
       return doctortreatments.findBydoctor(id);
    } 
    
    @GetMapping("/getcasestudiesimagesbydoctor/{doctor}")
    public List<CasestudiesImages> getcasestudiesimagesbydoctor(@PathVariable("doctor") Integer doctor){
       List<Treatment> treat =  doctortreatments.findBydoctor(doctor);
       List<CasestudiesImages> cases = new ArrayList<>();
       treat.forEach(tr->{
           cases.addAll(this.casestudiesimages.findByTreatment(tr.getTreatmentid()));
       });
       return cases;
    } 
    
    @PostMapping("/savedoctortreatmentinTreatmentDoctor")
    public Treatmentdoctor savedoctortreatmentinTreatmentDoctor(@RequestBody Treatmentdoctor treat)
    {
       Treatmentdoctor doc =  this.doctortreatments.save(treat);
       return doc;
    }
    
    @GetMapping("/getdoctorfromtreatments/{id}")
    public List<Doctor> getdoctorfromtreatments(@PathVariable("id") Integer id){
        return this.doctortreatments.findDoctorByTreatment(id);
    }
}

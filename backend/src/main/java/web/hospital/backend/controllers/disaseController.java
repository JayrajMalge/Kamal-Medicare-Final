
package web.hospital.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import web.hospital.backend.enities.Disease;
import web.hospital.backend.enities.Diseaseimages;
import web.hospital.backend.repositiories.diseaseRepository;
import web.hospital.backend.repositiories.diseaseimagesRepository;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class disaseController {
    @Autowired
    private diseaseRepository diseases;
    
    @Autowired 
    private diseaseimagesRepository diseaseimages;
    
    @GetMapping("/getalldiseases")
    public List<Disease> getalldiseases(){
        return diseases.findAll();
    }
    
    @GetMapping("/getdiseasebydiseaseid/{disid}")
    public Disease getalldiseases(@PathVariable("disid") Integer disid){
        return diseases.findByDiseaseid(disid);
    }
    
    @GetMapping("/getalldiseasesimages/{disease}")
    public List<Diseaseimages> getalldiseasesimages(@PathVariable("disease") Integer disease){
        return diseaseimages.findByDisease(disease);
    }
    
    @DeleteMapping("/deletedisease/{disease}")
    public void deletediseaseimages(@PathVariable("disease") Integer disease){
        diseases.DeleteByDiseaseid(disease);
    }
    
    @PostMapping("/setnewdisease")
    public Disease setnewdisease(@RequestBody Disease dis){
        return diseases.save(dis);
    }
    
    @PostMapping("/setnewdiseaseimages")
    public void setnewdiseaseimages(@RequestParam("disid") Integer disid,@RequestParam("images") List<MultipartFile> files){
      try { 
            for (MultipartFile file : files) {
                Diseaseimages disimg = new Diseaseimages();
                disimg.setDisease(diseases.findByDiseaseid(disid));
                disimg.setImagename(file.getOriginalFilename());
                disimg.setImagetype(file.getContentType());
                disimg.setImage(file.getBytes());
                diseaseimages.save(disimg);
           } 
        }  
        catch(Exception exception){}
    }
    
    @PostMapping("/updatediseaseimages")
    public void updatediseaseimages(@RequestParam("disid") Integer disid,@RequestParam("images") List<MultipartFile> files){
      try { 
           diseaseimages.DeleteByDiseaseid(disid);
            for (MultipartFile file : files) {
                Diseaseimages disimg = new Diseaseimages();
                disimg.setDisease(diseases.findByDiseaseid(disid));
                disimg.setImagename(file.getOriginalFilename());
                disimg.setImagetype(file.getContentType());
                disimg.setImage(file.getBytes());
                diseaseimages.save(disimg);
           } 
        }  
        catch(Exception exception){}
    }
    
    @GetMapping("/getalldiseasesbyname/{name}")
    public List<Disease> getalldiseasesbyname(@PathVariable("name") String name){
        return diseases.findByName(name);
    }
    
}

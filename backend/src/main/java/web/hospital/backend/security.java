
package web.hospital.backend;
/*
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class security {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http
               .authorizeHttpRequests(registry ->{
                  registry.requestMatchers("/index","/getuser","/sendOTPtoemail/{email}","/emailverfication",
                          "/getbyemail/{email}","/savedcospe","/savednews","/savednewsimages",
                          "/savedoctor","/saveeducation","/saveexperience","/savespeacialization",
                          "/savesubspeacializationimgvid","/savesubspeacialization","/savefacilities",
                          "/savefacilitiesimages","/getdoctors","/getspecializations","/getfacilites","/updatedoctor",
                          "/savedpatiens","/savedcasestudiesimages","/savedcasestudies","/savedtreatment"
                          ,"/getspecializationsbydoctorid/{doctor}","/geteducations/{doctorid}","/getexperience/{doctorid}",
                          "/updateeducation","/updatedocspeacialization","/Updateexperience","/getfacilitesbyfacilityid/{facilityid}",
                          "/getspeacializationbyid/{speacializationbyid}","/getalltreatments","/gettreatmentbytreatmentid/{id}",
                          "/getsubspeacializationimagesvideobyid/{subspeacializationbyid}","/getcasestudiesbytreatment/{id}",
                          "/getcasestudiesimagesbycasestudyid/{id}","/setcasestudiesimages","/setcasestudiesimagesput",
                          "/savednewcasestudiesimages","deletespecializationbyspeacializationid/{speacializationid}",
                          "/getallsubspeacialization","/setnewspecializationimages","/getallcasestudies","/getallhospitaldata",
                          "getpatientbytreatmentid/{patientid}","deletefaciitybyfacilityid/{facilityid}","/gethospitaldata/{title}"
                          ,"/getfacilitesimagesbyfacilityid/{facilityid}","/savenewfacilitesimages","/getnews","/getnewsimages",
                          "/checkvaildpatient/{name}/{phoneno}","/createnewreview","/getallreviews","/getalldiseasesbyname/{name}",
                          "deletedoctorbydoctorid/{doctorid}","/setsubspeacializationimgvid","/getspecializationbyid/{id}",
                          "/getcasestudiesimagesbydoctor/{doctor}","/gettreatmentbydcotor/{id}","/updatehospital"
                          ,"/getsubspecializationbysubspecializationid/{subspeacializationid}","/getnewsimagesbynewsid/{newsid}",
                          "/getdoctorspecializationbysubspecializationid/{speacializationid}","/getnewsbynewsid/{newsid}",
                          "/getsectionbysectionid/{sectionid}","/updatesection","deletepatient/{patientid}","deletenews/{newsid}",
                          "/saveappointment","/getappointment","/getallappointmentbystatus/{status}","/getalldiseases",
                          "/getalldiseasesimages/{disease}","/deletedisease/{disease}","/setnewdisease","/setnewdiseaseimages",
                          "/updatediseaseimages","/getdiseasebydiseaseid/{disid}","/getspecializationbyfieldname/{fieldname}",
                          "deletebyexperienceid/{experienceid}","deletebyeducationid/{educationid}",savedoctortreatmentinTreatmentDoctor
                          ).permitAll();
                  registry.anyRequest().authenticated();
               })
               .oauth2Login(oauth2Login->{
                    oauth2Login
                            .defaultSuccessUrl("http://localhost:5000/login/auth");
                })
               .formLogin(Customizer.withDefaults())
               .csrf().disable();
              return http.build();
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200/")  // Angular frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}*/

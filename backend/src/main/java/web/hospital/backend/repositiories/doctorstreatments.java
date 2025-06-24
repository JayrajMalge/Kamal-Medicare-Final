
package web.hospital.backend.repositiories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.CasestudiesImages;
import web.hospital.backend.enities.Doctor;
import web.hospital.backend.enities.Treatment;
import web.hospital.backend.enities.Treatmentdoctor;

@Repository
public interface doctorstreatments extends JpaRepository<Treatmentdoctor,Integer>{
       @Query( "SELECT t.treatment FROM Treatmentdoctor t WHERE t.doctor = :doctor")
        public List<Treatment> findBydoctor(@Param("doctor") Integer doctor);
        
         @Query( "SELECT t FROM Treatmentdoctor t WHERE t.treatment.treatmentid = :treatment")
        public List<CasestudiesImages> findByTreatment(@Param("treatment") Integer treatment);
        
        @Query( "SELECT t.doctor FROM Treatmentdoctor t WHERE t.treatment.treatmentid = :treatment")
        public List<Doctor> findDoctorByTreatment(@Param("treatment") Integer treatment);
}

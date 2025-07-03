
 package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Doctor;
import web.hospital.backend.enities.DoctorSpeacialization;

@Repository
public interface doctorSpeacializationRepository extends JpaRepository<DoctorSpeacialization,Integer>{
        @Query("SELECT d FROM DoctorSpeacialization d WHERE d.doctorspeacializationid = :doctorspeacializationid")
        public DoctorSpeacialization findByDoctorspeacializationid(@Param("doctorspeacializationid") Integer doctorspeacializationid);
       
        @Query("SELECT d FROM DoctorSpeacialization d WHERE d.doctor.doctorid = :doctor")
        public List<DoctorSpeacialization> findByDoctor(@Param("doctor") Integer doctor);
        
        @Modifying
        @Transactional
        @Query("DELETE FROM DoctorSpeacialization d  WHERE d.doctor.doctorid = :doctorid")
        public int DeleteByDoctor(@Param("doctorid") Integer doctorid);
        
        @Query("SELECT d FROM DoctorSpeacialization d WHERE d.speacialization.speacializationid = :speacializationid")
        public List<DoctorSpeacialization> findBySpeacialization(@Param("speacializationid") Integer speacializationid);

}

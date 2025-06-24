
package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Education;
import web.hospital.backend.enities.Experience;

@Repository
public interface educationRespository extends  JpaRepository<Education,Integer> {
        @Query("SELECT e FROM Education e WHERE e.doctor.doctorid = :doctorid")
        public List<Education> findByDoctorId(@Param("doctorid") Integer doctorid);
        
        @Modifying
        @Transactional
        @Query("DELETE FROM Education e WHERE e.doctor.doctorid = :doctorid")
        public int DeleteByDoctor(@Param("doctorid") Integer doctorid);
        
        
        @Modifying
        @Transactional
        @Query("DELETE FROM Education e WHERE e.educationid = :educationid")
        public int DeleteByEducationid(@Param("educationid") Integer educationid);


}

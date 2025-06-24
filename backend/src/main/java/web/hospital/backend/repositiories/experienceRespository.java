
package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Experience;

@Repository
public interface experienceRespository extends JpaRepository<Experience,Integer> {
     @Query("SELECT e FROM Experience e WHERE e.doctor.doctorid = :doctorid")
      public List<Experience> findByDoctorId(@Param("doctorid") Integer doctorid);
      
     @Modifying
     @Transactional
     @Query("DELETE FROM Experience e WHERE e.doctor.doctorid = :doctorid")
     public int DeleteByDoctor(@Param("doctorid") Integer doctorid);
     
     @Modifying
     @Transactional
     @Query("DELETE FROM Experience e WHERE e.experienceid = :experienceid")
     public int DeleteByExperienceid(@Param("experienceid") Integer experienceid);
}

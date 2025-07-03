
package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Doctor;

@Repository
public interface doctorRepository extends JpaRepository<Doctor,Integer>{
        @Modifying
        @Transactional
        @Query("DELETE FROM Doctor d WHERE d.doctorid = :doctorid")
        public int DeleteByDoctorid(@Param("doctorid") Integer doctorid);

        @Query("SELECT d FROM Doctor d WHERE d.doctorid = :doctorid")
        public Doctor findByDoctorid(@Param("doctorid") Integer doctorid);
}

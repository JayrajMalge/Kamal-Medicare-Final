
package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Speacialization;

@Repository
public interface specializationRepository extends JpaRepository<Speacialization,Integer>{
        @Query("SELECT s FROM Speacialization s WHERE s.speacializationid = :speacializationid")
        public Speacialization findBySpeacializationid(@Param("speacializationid") Integer speacializationid);
        
        @Modifying
        @Transactional
        @Query("DELETE FROM Speacialization s WHERE s.speacializationid = :speacializationid")
        public int DeleteBySpeacializationid(@Param("speacializationid") Integer speacializationid);
        
        @Query("SELECT s FROM Speacialization s WHERE s.fieldname LIKE LOWER(CONCAT('%', :fieldname, '%'))")
        public List<Speacialization> findByTitle(@Param("fieldname") String fieldname);
}

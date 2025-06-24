
package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Subspeacialization;

@Repository
public interface subspecializationRepository extends JpaRepository<Subspeacialization,Integer>{
        @Query("SELECT s FROM Subspeacialization s WHERE s.subspeacializationid = :subspeacializationid")
        public Subspeacialization findBySubspeacializationid(@Param("subspeacializationid") Integer subspeacializationid);
        
        @Query("SELECT s FROM Subspeacialization s WHERE s.speacialization.speacializationid = :speacialization")
        public List<Subspeacialization> findBySpeacialization(@Param("speacialization") Integer speacializationid);
        
        @Modifying
        @Transactional
        @Query("DELETE FROM Subspeacialization s WHERE s.speacialization.speacializationid = :speacializationid")
        public int DeleteBySpeacialization(@Param("speacializationid") Integer speacializationid);

        
}


package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Subspeacializationimagesvideo;

@Repository
public interface subspecializationimavideoRepository extends JpaRepository<Subspeacializationimagesvideo,Integer> {
        @Query("SELECT s FROM Subspeacializationimagesvideo s WHERE s.subspeacialization.subspeacializationid = :subspeacializationid")
        public List<Subspeacializationimagesvideo> findBySubspeacialization(@Param("subspeacializationid") Integer subspeacializationid);
        
        @Modifying
        @Transactional
        @Query("DELETE FROM Subspeacializationimagesvideo s WHERE s.subspeacialization.subspeacializationid = :subspeacializationid")
        public int DeleteBySubspeacialization(@Param("subspeacializationid") Integer subspeacializationid);
        
        @Modifying
        @Transactional
        @Query("DELETE FROM Subspeacializationimagesvideo s WHERE s.subspeacialization.speacialization.speacializationid = :speacializationid")
        public int DeleteBySpeacialization(@Param("speacializationid") Integer speacializationid);

}



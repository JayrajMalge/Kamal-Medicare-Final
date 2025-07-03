
package web.hospital.backend.repositiories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Section;

@Repository
public interface sectionRepository extends JpaRepository<Section,Integer>{
        @Query("SELECT s FROM Section s WHERE s.sectionid = :sectionid")
        public Section findBySectionid(@Param("sectionid") Integer sectionid);
        
        @Query("SELECT s FROM Section s WHERE s.heading = :heading")
        public Section findByHeading(@Param("heading") String heading);
}

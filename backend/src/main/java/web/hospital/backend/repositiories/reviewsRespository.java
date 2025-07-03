
package web.hospital.backend.repositiories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.DoctorSpeacialization;
import web.hospital.backend.enities.Review;

@Repository
public interface reviewsRespository extends JpaRepository<Review,Integer>{
    
}

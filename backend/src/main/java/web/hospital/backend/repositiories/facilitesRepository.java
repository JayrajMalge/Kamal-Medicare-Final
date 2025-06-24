package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Facilites;

@Repository
public interface facilitesRepository extends JpaRepository<Facilites,Integer>{
        @Query("SELECT f FROM Facilites f WHERE f.facilitesid = :facilitesid")
        public Facilites findByFacilitesid(@Param("facilitesid") Integer facilitesid);

        @Modifying
        @Transactional
        @Query("DELETE FROM Facilites f WHERE f.facilitesid = :facilitesid")
        public int DeleteByFacilitesid(@Param("facilitesid") Integer facilitesid);

}

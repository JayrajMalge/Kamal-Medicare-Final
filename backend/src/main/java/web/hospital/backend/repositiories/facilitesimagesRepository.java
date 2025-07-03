/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Facilites;
import web.hospital.backend.enities.FacilitesImages;

@Repository
public interface facilitesimagesRepository extends JpaRepository<FacilitesImages,Integer>{
        @Query("SELECT f FROM FacilitesImages f WHERE f.facility.facilitesid = :facilitesid")
        public  List<FacilitesImages> findByFacility(@Param("facilitesid") Integer facilitesid);
        
        @Modifying
        @Transactional
        @Query("DELETE FROM FacilitesImages f WHERE f.facility.facilitesid = :facilitesid")
        public int DeleteByFacility(@Param("facilitesid") Integer facilitesid);

}

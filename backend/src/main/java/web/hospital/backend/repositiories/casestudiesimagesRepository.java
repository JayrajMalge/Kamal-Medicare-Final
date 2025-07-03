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
import web.hospital.backend.enities.CasestudiesImages;

@Repository
public interface casestudiesimagesRepository extends JpaRepository<CasestudiesImages,Integer> {
        @Query( "SELECT c FROM CasestudiesImages c WHERE c.casestudy.casestudyid = :casestudyid")
        public List<CasestudiesImages> findByCasestudy(@Param("casestudyid") Integer casestudyid);
       
        @Query( "SELECT c FROM CasestudiesImages c WHERE c.casestudy.treatmentid.treatmentid = :treatmentid")
        public List<CasestudiesImages> findByTreatment(@Param("treatmentid") Integer treatmentid);

         @Modifying
         @Transactional
         @Query( "DELETE FROM CasestudiesImages c WHERE c.casestudy.casestudyid = :casestudyid")
         public int DeleteByCasestudy(@Param("casestudyid") Integer casestudyid);

}

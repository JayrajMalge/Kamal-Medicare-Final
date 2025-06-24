/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package web.hospital.backend.repositiories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Casestudies;

@Repository
public interface casestudyRepository extends JpaRepository<Casestudies,Integer>{
        @Query("SELECT c FROM Casestudies c WHERE c.casestudyid = :casestudyid")
        public Casestudies findByCasestudyid(@Param("casestudyid") Integer casestudyid);
       
        @Query("SELECT c FROM Casestudies c WHERE c.treatmentid.treatmentid = :treatmentid")
        public List<Casestudies> findByTreatmentid(@Param("treatmentid") Integer treatmentid);
}


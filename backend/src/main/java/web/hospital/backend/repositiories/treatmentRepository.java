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
import web.hospital.backend.enities.Treatment;

@Repository
public interface treatmentRepository extends JpaRepository<Treatment,Integer>{
        @Query( "SELECT t FROM Treatment t WHERE t.treatmentid = :treatmentid")
        public List<Treatment> findByTreatmentid(@Param("treatmentid") Integer treatmentid);
        
        /*@Query( "SELECT t FROM Treatment t WHERE t.doctor = :doctor")
        public List<Treatment> findBydoctor(@Param("doctor") Integer doctor);*/
        
        @Modifying
        @Transactional
        @Query( "DELETE FROM Treatment t WHERE t.treatmentid = :treatmentid")
        public void DeleteByTreatmentid(@Param("treatmentid") Integer treatmentid);

}

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
import web.hospital.backend.enities.Disease;

@Repository
public interface diseaseRepository extends JpaRepository<Disease,Integer>{
        @Query("SELECT d FROM Disease d WHERE d.diseaseid = :diseaseid")
        public Disease findByDiseaseid(@Param("diseaseid") Integer diseaseid);
        
       @Modifying
       @Transactional
       @Query("DELETE FROM Disease d WHERE d.diseaseid = :diseaseid")
       public int DeleteByDiseaseid(@Param("diseaseid") Integer diseaseid);
       
       @Query("SELECT d FROM Disease d WHERE d.name LIKE LOWER(CONCAT('%', :fieldname, '%'))")
        public List<Disease> findByName(@Param("fieldname") String fieldname);
}

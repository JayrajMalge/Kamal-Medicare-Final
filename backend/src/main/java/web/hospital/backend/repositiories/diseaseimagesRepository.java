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
import web.hospital.backend.enities.Diseaseimages;

@Repository
public interface diseaseimagesRepository extends JpaRepository<Diseaseimages,Integer> {
     @Query("SELECT d FROM Diseaseimages d WHERE d.disease.diseaseid = :diseaseid")
     public List<Diseaseimages> findByDisease(@Param("diseaseid") Integer diseaseid);
     
       @Modifying
       @Transactional
       @Query("DELETE FROM Diseaseimages d WHERE d.disease.diseaseid = :diseaseid")
       public int DeleteByDiseaseid(@Param("diseaseid") Integer diseaseid);
}

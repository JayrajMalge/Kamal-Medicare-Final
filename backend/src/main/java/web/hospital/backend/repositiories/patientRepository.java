/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package web.hospital.backend.repositiories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.hospital.backend.enities.Patient;

@Repository
public interface patientRepository extends JpaRepository<Patient,Integer>{
        @Query("SELECT p FROM Patient p WHERE p.patientid = :patientid")
        public Patient findByPatientid(@Param("patientid") Integer patientid);

        @Query("SELECT p FROM Patient p WHERE p.name = :name AND p.phoneno = :phoneno")
        public Patient findByNameAndPhoneno(@Param("name") String name,@Param("phoneno") String phoneno);

        @Modifying
        @Transactional  
        @Query("DELETE FROM Patient p WHERE p.patientid = :patientid")
        public int DeleteByPatientid(@Param("patientid") Integer patientid);

}

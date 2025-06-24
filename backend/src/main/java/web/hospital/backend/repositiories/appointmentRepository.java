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
import web.hospital.backend.enities.Appointment;


@Repository
public interface appointmentRepository extends JpaRepository<Appointment,Integer>{
        @Query("SELECT a FROM Appointment a WHERE a.status = :status")
        public List<Appointment> findByStatus(@Param("status") String status);
         
        @Modifying
        @Transactional
        @Query("DELETE  FROM Appointment a WHERE a.status = :status")
        public int DeleteByStatus(@Param("status") String status);
}

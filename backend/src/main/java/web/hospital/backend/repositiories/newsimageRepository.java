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
import web.hospital.backend.enities.Newsimage;

@Repository
public interface newsimageRepository extends JpaRepository<Newsimage,Integer>{
       @Query("SELECT n FROM Newsimage n WHERE n.newsid.newsid = :newsid")
       public Newsimage findByNewsid(@Param("newsid") Integer newsid);
       
        @Modifying
        @Transactional
       @Query("DELETE FROM Newsimage n WHERE n.newsid.newsid = :newsid")
       public int DeleteByNewsid(@Param("newsid") Integer newsid);

}

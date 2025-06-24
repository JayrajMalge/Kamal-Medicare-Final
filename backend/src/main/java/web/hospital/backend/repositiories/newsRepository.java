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
import web.hospital.backend.enities.News;

@Repository
public interface newsRepository extends JpaRepository<News,Integer>{
        @Query( "SELECT n FROM News n WHERE n.newsid = :newsid")
         public News findByNewsid(@Param("newsid") Integer newsid);
        
       @Modifying
       @Transactional
       @Query("DELETE FROM News n WHERE n.newsid = :newsid")
       public int DeleteByNewsid(@Param("newsid") Integer newsid);
       
       @Query( "SELECT n FROM News n WHERE n.newstype = :newstype")
       public List<News> findByNewstype(@Param("newstype") String newstype);
}

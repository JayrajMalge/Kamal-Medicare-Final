/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package web.hospital.backend.enities;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import java.io.Serializable;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "newsimage")
@NamedQueries({
    @NamedQuery(name = "Newsimage.findAll", query = "SELECT n FROM Newsimage n"),
    @NamedQuery(name = "Newsimage.findByNews", query = "SELECT n FROM Newsimage n WHERE n.news = :news")})
public class Newsimage implements Serializable {

    private static final long serialVersionUID = 1L;
    @Lob
    @Column(name = "image")
    private byte[] image;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "news")
    private Integer news;
    @Lob
    @Column(name = "imagename")
    private String imagename;
    @Lob
    @Column(name = "imagetype")
    private String imagetype;
    @JoinColumn(name = "newsid", referencedColumnName = "newsid")
    @ManyToOne
    private News newsid;

    public Newsimage() {
    }

    public Newsimage(Integer news) {
        this.news = news;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Integer getNews() {
        return news;
    }

    public void setNews(Integer news) {
        this.news = news;
    }

    public String getImagename() {
        return imagename;
    }

    public void setImagename(String imagename) {
        this.imagename = imagename;
    }

    public String getImagetype() {
        return imagetype;
    }

    public void setImagetype(String imagetype) {
        this.imagetype = imagetype;
    }

    public News getNewsid() {
        return newsid;
    }

    public void setNewsid(News newsid) {
        this.newsid = newsid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (news != null ? news.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Newsimage)) {
            return false;
        }
        Newsimage other = (Newsimage) object;
        if ((this.news == null && other.news != null) || (this.news != null && !this.news.equals(other.news))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Newsimage[ news=" + news + " ]";
    }
    
}

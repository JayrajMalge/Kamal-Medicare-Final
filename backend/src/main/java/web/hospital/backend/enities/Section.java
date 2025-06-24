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
import jakarta.persistence.Lob;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import java.io.Serializable;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "section")
@NamedQueries({
    @NamedQuery(name = "Section.findAll", query = "SELECT s FROM Section s"),
    @NamedQuery(name = "Section.findBySectionid", query = "SELECT s FROM Section s WHERE s.sectionid = :sectionid")})
public class Section implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "sectionid")
    private Integer sectionid;
    @Lob
    @Column(name = "heading")
    private String heading;
    @Lob
    @Column(name = "content")
    private String content;
    @Lob
    @Column(name = "imgvid")
    private byte[] imgvid;
    @Lob
    @Column(name = "imagename")
    private String imagename;
    @Lob
    @Column(name = "imagetype")
    private String imagetype;

    public Section() {
    }

    public Section(Integer sectionid) {
        this.sectionid = sectionid;
    }

    public Integer getSectionid() {
        return sectionid;
    }

    public void setSectionid(Integer sectionid) {
        this.sectionid = sectionid;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public byte[] getImgvid() {
        return imgvid;
    }

    public void setImgvid(byte[] imgvid) {
        this.imgvid = imgvid;
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

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (sectionid != null ? sectionid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Section)) {
            return false;
        }
        Section other = (Section) object;
        if ((this.sectionid == null && other.sectionid != null) || (this.sectionid != null && !this.sectionid.equals(other.sectionid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Section[ sectionid=" + sectionid + " ]";
    }
    
}

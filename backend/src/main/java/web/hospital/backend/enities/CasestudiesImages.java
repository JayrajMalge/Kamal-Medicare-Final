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
@Table(name = "casestudies_images")
@NamedQueries({
    @NamedQuery(name = "CasestudiesImages.findAll", query = "SELECT c FROM CasestudiesImages c"),
    @NamedQuery(name = "CasestudiesImages.findByImgid", query = "SELECT c FROM CasestudiesImages c WHERE c.imgid = :imgid")})
public class CasestudiesImages implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "imgid")
    private Integer imgid;
    @Lob
    @Column(name = "image")
    private byte[] image;
    @Lob
    @Column(name = "imagename")
    private String imagename;
    @Lob
    @Column(name = "imagetype")
    private String imagetype;
    @JoinColumn(name = "casestudy", referencedColumnName = "casestudyid")
    @ManyToOne
    private Casestudies casestudy;

    public CasestudiesImages() {
    }

    public CasestudiesImages(Integer imgid) {
        this.imgid = imgid;
    }

    public Integer getImgid() {
        return imgid;
    }

    public void setImgid(Integer imgid) {
        this.imgid = imgid;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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

    public Casestudies getCasestudy() {
        return casestudy;
    }

    public void setCasestudy(Casestudies casestudy) {
        this.casestudy = casestudy;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (imgid != null ? imgid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CasestudiesImages)) {
            return false;
        }
        CasestudiesImages other = (CasestudiesImages) object;
        if ((this.imgid == null && other.imgid != null) || (this.imgid != null && !this.imgid.equals(other.imgid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.CasestudiesImages[ imgid=" + imgid + " ]";
    }
    
}

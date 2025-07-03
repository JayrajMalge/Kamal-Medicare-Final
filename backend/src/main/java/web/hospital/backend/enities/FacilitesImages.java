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
@Table(name = "facilites_images")
@NamedQueries({
    @NamedQuery(name = "FacilitesImages.findAll", query = "SELECT f FROM FacilitesImages f"),
    @NamedQuery(name = "FacilitesImages.findByImgid", query = "SELECT f FROM FacilitesImages f WHERE f.imgid = :imgid")})
public class FacilitesImages implements Serializable {

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
    @JoinColumn(name = "facility", referencedColumnName = "facilitesid")
    @ManyToOne
    private Facilites facility;

    public FacilitesImages() {
    }

    public FacilitesImages(Integer imgid) {
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

    public Facilites getFacility() {
        return facility;
    }

    public void setFacility(Facilites facility) {
        this.facility = facility;
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
        if (!(object instanceof FacilitesImages)) {
            return false;
        }
        FacilitesImages other = (FacilitesImages) object;
        if ((this.imgid == null && other.imgid != null) || (this.imgid != null && !this.imgid.equals(other.imgid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.FacilitesImages[ imgid=" + imgid + " ]";
    }
    
}

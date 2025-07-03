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
@Table(name = "diseaseimages")
@NamedQueries({
    @NamedQuery(name = "Diseaseimages.findAll", query = "SELECT d FROM Diseaseimages d"),
    @NamedQuery(name = "Diseaseimages.findByDiseaseimageid", query = "SELECT d FROM Diseaseimages d WHERE d.diseaseimageid = :diseaseimageid"),
    @NamedQuery(name = "Diseaseimages.findByImagetype", query = "SELECT d FROM Diseaseimages d WHERE d.imagetype = :imagetype")})
public class Diseaseimages implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "diseaseimageid")
    private Integer diseaseimageid;
    @Lob
    @Column(name = "image")
    private byte[] image;
    @Lob
    @Column(name = "imagename")
    private String imagename;
    @Column(name = "imagetype")
    private String imagetype;
    @JoinColumn(name = "disease", referencedColumnName = "diseaseid")
    @ManyToOne
    private Disease disease;

    public Diseaseimages() {
    }

    public Diseaseimages(Integer diseaseimageid) {
        this.diseaseimageid = diseaseimageid;
    }

    public Integer getDiseaseimageid() {
        return diseaseimageid;
    }

    public void setDiseaseimageid(Integer diseaseimageid) {
        this.diseaseimageid = diseaseimageid;
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

    public Disease getDisease() {
        return disease;
    }

    public void setDisease(Disease disease) {
        this.disease = disease;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (diseaseimageid != null ? diseaseimageid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Diseaseimages)) {
            return false;
        }
        Diseaseimages other = (Diseaseimages) object;
        if ((this.diseaseimageid == null && other.diseaseimageid != null) || (this.diseaseimageid != null && !this.diseaseimageid.equals(other.diseaseimageid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Diseaseimages[ diseaseimageid=" + diseaseimageid + " ]";
    }
    
}

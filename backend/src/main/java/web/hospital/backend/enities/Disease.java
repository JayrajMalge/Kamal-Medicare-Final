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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.List;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "disease")
@NamedQueries({
    @NamedQuery(name = "Disease.findAll", query = "SELECT d FROM Disease d"),
    @NamedQuery(name = "Disease.findByDiseaseid", query = "SELECT d FROM Disease d WHERE d.diseaseid = :diseaseid"),
    @NamedQuery(name = "Disease.findByName", query = "SELECT d FROM Disease d WHERE d.name = :name")})
public class Disease implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "diseaseid")
    private Integer diseaseid;
    @Column(name = "name")
    private String name;
    @Lob
    @Column(name = "description")
    private String description;
    /*@OneToMany(mappedBy = "disease")
    private List<Diseaseimages> diseaseimagesList;*/

    public Disease() {
    }

    public Disease(Integer diseaseid) {
        this.diseaseid = diseaseid;
    }

    public Integer getDiseaseid() {
        return diseaseid;
    }

    public void setDiseaseid(Integer diseaseid) {
        this.diseaseid = diseaseid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /*public List<Diseaseimages> getDiseaseimagesList() {
        return diseaseimagesList;
    }

    public void setDiseaseimagesList(List<Diseaseimages> diseaseimagesList) {
        this.diseaseimagesList = diseaseimagesList;
    }*/

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (diseaseid != null ? diseaseid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Disease)) {
            return false;
        }
        Disease other = (Disease) object;
        if ((this.diseaseid == null && other.diseaseid != null) || (this.diseaseid != null && !this.diseaseid.equals(other.diseaseid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Disease[ diseaseid=" + diseaseid + " ]";
    }
    
}

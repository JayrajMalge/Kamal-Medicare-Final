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
@Table(name = "facilites")
@NamedQueries({
    @NamedQuery(name = "Facilites.findAll", query = "SELECT f FROM Facilites f"),
    @NamedQuery(name = "Facilites.findByFacilitesid", query = "SELECT f FROM Facilites f WHERE f.facilitesid = :facilitesid"),
    @NamedQuery(name = "Facilites.findByFacilityname", query = "SELECT f FROM Facilites f WHERE f.facilityname = :facilityname"),
    @NamedQuery(name = "Facilites.findByAvailability", query = "SELECT f FROM Facilites f WHERE f.availability = :availability"),
    @NamedQuery(name = "Facilites.findByFacilitytype", query = "SELECT f FROM Facilites f WHERE f.facilitytype = :facilitytype")})
public class Facilites implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "facilitesid")
    private Integer facilitesid;
    @Column(name = "facilityname")
    private String facilityname;
    @Lob
    @Column(name = "description")
    private String description;
    @Column(name = "availability")
    private String availability;
    @Column(name = "facilitytype")
    private String facilitytype;
    /*@OneToMany(mappedBy = "facility")
    private List<FacilitesImages> facilitesImagesList;*/

    public Facilites() {
    }

    public Facilites(Integer facilitesid) {
        this.facilitesid = facilitesid;
    }

    public Integer getFacilitesid() {
        return facilitesid;
    }

    public void setFacilitesid(Integer facilitesid) {
        this.facilitesid = facilitesid;
    }

    public String getFacilityname() {
        return facilityname;
    }

    public void setFacilityname(String facilityname) {
        this.facilityname = facilityname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getFacilitytype() {
        return facilitytype;
    }

    public void setFacilitytype(String facilitytype) {
        this.facilitytype = facilitytype;
    }

    /*public List<FacilitesImages> getFacilitesImagesList() {
        return facilitesImagesList;
    }

    public void setFacilitesImagesList(List<FacilitesImages> facilitesImagesList) {
        this.facilitesImagesList = facilitesImagesList;
    }*/

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (facilitesid != null ? facilitesid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Facilites)) {
            return false;
        }
        Facilites other = (Facilites) object;
        if ((this.facilitesid == null && other.facilitesid != null) || (this.facilitesid != null && !this.facilitesid.equals(other.facilitesid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Facilites[ facilitesid=" + facilitesid + " ]";
    }
    
}

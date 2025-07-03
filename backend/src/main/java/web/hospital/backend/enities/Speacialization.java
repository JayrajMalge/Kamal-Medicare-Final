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
@Table(name = "speacialization")
@NamedQueries({
    @NamedQuery(name = "Speacialization.findAll", query = "SELECT s FROM Speacialization s"),
    @NamedQuery(name = "Speacialization.findBySpeacializationid", query = "SELECT s FROM Speacialization s WHERE s.speacializationid = :speacializationid"),
    @NamedQuery(name = "Speacialization.findByFieldname", query = "SELECT s FROM Speacialization s WHERE s.fieldname = :fieldname")})
public class Speacialization implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "speacializationid")
    private Integer speacializationid;
    @Column(name = "fieldname")
    private String fieldname;
    @Lob
    @Column(name = "description")
    private String description;
    /*@OneToMany(mappedBy = "speacialization")
    private List<DoctorSpeacialization> doctorSpeacializationList;
    @OneToMany(mappedBy = "speacialization")
    private List<Subspeacialization> subspeacializationList;*/

    public Speacialization() {
    }

    public Speacialization(Integer speacializationid) {
        this.speacializationid = speacializationid;
    }

    public Integer getSpeacializationid() {
        return speacializationid;
    }

    public void setSpeacializationid(Integer speacializationid) {
        this.speacializationid = speacializationid;
    }

    public String getFieldname() {
        return fieldname;
    }

    public void setFieldname(String fieldname) {
        this.fieldname = fieldname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /*public List<DoctorSpeacialization> getDoctorSpeacializationList() {
        return doctorSpeacializationList;
    }

    public void setDoctorSpeacializationList(List<DoctorSpeacialization> doctorSpeacializationList) {
        this.doctorSpeacializationList = doctorSpeacializationList;
    }

    public List<Subspeacialization> getSubspeacializationList() {
        return subspeacializationList;
    }

    public void setSubspeacializationList(List<Subspeacialization> subspeacializationList) {
        this.subspeacializationList = subspeacializationList;
    }*/

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (speacializationid != null ? speacializationid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Speacialization)) {
            return false;
        }
        Speacialization other = (Speacialization) object;
        if ((this.speacializationid == null && other.speacializationid != null) || (this.speacializationid != null && !this.speacializationid.equals(other.speacializationid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Speacialization[ speacializationid=" + speacializationid + " ]";
    }
    
}

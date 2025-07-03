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
@Table(name = "doctor_speacialization")
@NamedQueries({
    @NamedQuery(name = "DoctorSpeacialization.findAll", query = "SELECT d FROM DoctorSpeacialization d"),
    @NamedQuery(name = "DoctorSpeacialization.findByDoctorspeacializationid", query = "SELECT d FROM DoctorSpeacialization d WHERE d.doctorspeacializationid = :doctorspeacializationid")})
public class DoctorSpeacialization implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "doctorspeacializationid")
    private Integer doctorspeacializationid;
    @JoinColumn(name = "doctor", referencedColumnName = "doctorid")
    @ManyToOne
    private Doctor doctor;
    @JoinColumn(name = "speacialization", referencedColumnName = "speacializationid")
    @ManyToOne
    private Speacialization speacialization;

    public DoctorSpeacialization() {
    }

    public DoctorSpeacialization(Integer doctorspeacializationid) {
        this.doctorspeacializationid = doctorspeacializationid;
    }

    public Integer getDoctorspeacializationid() {
        return doctorspeacializationid;
    }

    public void setDoctorspeacializationid(Integer doctorspeacializationid) {
        this.doctorspeacializationid = doctorspeacializationid;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Speacialization getSpeacialization() {
        return speacialization;
    }

    public void setSpeacialization(Speacialization speacialization) {
        this.speacialization = speacialization;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (doctorspeacializationid != null ? doctorspeacializationid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof DoctorSpeacialization)) {
            return false;
        }
        DoctorSpeacialization other = (DoctorSpeacialization) object;
        if ((this.doctorspeacializationid == null && other.doctorspeacializationid != null) || (this.doctorspeacializationid != null && !this.doctorspeacializationid.equals(other.doctorspeacializationid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.DoctorSpeacialization[ doctorspeacializationid=" + doctorspeacializationid + " ]";
    }
    
}

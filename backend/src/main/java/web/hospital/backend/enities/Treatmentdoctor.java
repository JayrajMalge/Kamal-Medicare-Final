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
@Table(name = "treatmentdoctor")
@NamedQueries({
    @NamedQuery(name = "Treatmentdoctor.findAll", query = "SELECT t FROM Treatmentdoctor t"),
    @NamedQuery(name = "Treatmentdoctor.findByTreatmentdoctorid", query = "SELECT t FROM Treatmentdoctor t WHERE t.treatmentdoctorid = :treatmentdoctorid")})
public class Treatmentdoctor implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "treatmentdoctorid")
    private Integer treatmentdoctorid;
    @JoinColumn(name = "doctor", referencedColumnName = "doctorid")
    @ManyToOne
    private Doctor doctor;
    @JoinColumn(name = "treatment", referencedColumnName = "treatmentid")
    @ManyToOne
    private Treatment treatment;

    public Treatmentdoctor() {
    }

    public Treatmentdoctor(Integer treatmentdoctorid) {
        this.treatmentdoctorid = treatmentdoctorid;
    }

    public Integer getTreatmentdoctorid() {
        return treatmentdoctorid;
    }

    public void setTreatmentdoctorid(Integer treatmentdoctorid) {
        this.treatmentdoctorid = treatmentdoctorid;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Treatment getTreatment() {
        return treatment;
    }

    public void setTreatment(Treatment treatment) {
        this.treatment = treatment;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (treatmentdoctorid != null ? treatmentdoctorid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Treatmentdoctor)) {
            return false;
        }
        Treatmentdoctor other = (Treatmentdoctor) object;
        if ((this.treatmentdoctorid == null && other.treatmentdoctorid != null) || (this.treatmentdoctorid != null && !this.treatmentdoctorid.equals(other.treatmentdoctorid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Treatmentdoctor[ treatmentdoctorid=" + treatmentdoctorid + " ]";
    }
    
}

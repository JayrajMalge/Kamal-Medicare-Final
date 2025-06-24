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
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "treatment")
@NamedQueries({
    @NamedQuery(name = "Treatment.findAll", query = "SELECT t FROM Treatment t"),
    @NamedQuery(name = "Treatment.findByTreatmentid", query = "SELECT t FROM Treatment t WHERE t.treatmentid = :treatmentid"),
    @NamedQuery(name = "Treatment.findByTitle", query = "SELECT t FROM Treatment t WHERE t.title = :title"),
    @NamedQuery(name = "Treatment.findByDescription", query = "SELECT t FROM Treatment t WHERE t.description = :description"),
    @NamedQuery(name = "Treatment.findByCost", query = "SELECT t FROM Treatment t WHERE t.cost = :cost"),
    @NamedQuery(name = "Treatment.findByTratmentdate", query = "SELECT t FROM Treatment t WHERE t.tratmentdate = :tratmentdate")})
public class Treatment implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "treatmentid")
    private Integer treatmentid;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "cost")
    private Integer cost;
    @Column(name = "tratmentdate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date tratmentdate;
    //@JoinColumn(name = "treatmentid", referencedColumnName = "patientid", insertable = false, updatable = false)
    /*@OneToOne(optional = false)
    private Patient patient;*/
    /*-@OneToMany(mappedBy = "treatment")
    private List<Treatmentdoctor> treatmentdoctorList;
    @OneToMany(mappedBy = "treatmentid")
    private List<Casestudies> casestudiesList;*/

    public Treatment() {
    }

    public Treatment(Integer treatmentid) {
        this.treatmentid = treatmentid;
    }

    public Integer getTreatmentid() {
        return treatmentid;
    }

    public void setTreatmentid(Integer treatmentid) {
        this.treatmentid = treatmentid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Date getTratmentdate() {
        return tratmentdate;
    }

    public void setTratmentdate(Date tratmentdate) {
        this.tratmentdate = tratmentdate;
    }

    /*public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }*/

    /*public List<Treatmentdoctor> getTreatmentdoctorList() {
        return treatmentdoctorList;
    }

    public void setTreatmentdoctorList(List<Treatmentdoctor> treatmentdoctorList) {
        this.treatmentdoctorList = treatmentdoctorList;
    }

    public List<Casestudies> getCasestudiesList() {
        return casestudiesList;
    }

    public void setCasestudiesList(List<Casestudies> casestudiesList) {
        this.casestudiesList = casestudiesList;
    }*/

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (treatmentid != null ? treatmentid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Treatment)) {
            return false;
        }
        Treatment other = (Treatment) object;
        if ((this.treatmentid == null && other.treatmentid != null) || (this.treatmentid != null && !this.treatmentid.equals(other.treatmentid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Treatment[ treatmentid=" + treatmentid + " ]";
    }
    
}

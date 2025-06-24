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
import jakarta.persistence.OneToMany;
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
@Table(name = "casestudies")
@NamedQueries({
    @NamedQuery(name = "Casestudies.findAll", query = "SELECT c FROM Casestudies c"),
    @NamedQuery(name = "Casestudies.findByCasestudyid", query = "SELECT c FROM Casestudies c WHERE c.casestudyid = :casestudyid"),
    @NamedQuery(name = "Casestudies.findByDateofcase", query = "SELECT c FROM Casestudies c WHERE c.dateofcase = :dateofcase")})
public class Casestudies implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "casestudyid")
    private Integer casestudyid;
    @Lob
    @Column(name = "title")
    private String title;
    @Lob
    @Column(name = "description")
    private String description;
    @Lob
    @Column(name = "result")
    private String result;
    @Column(name = "dateofcase")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateofcase;
    @JoinColumn(name = "treatmentid", referencedColumnName = "treatmentid")
    @ManyToOne
    private Treatment treatmentid;
    /*@OneToMany(mappedBy = "casestudy")
    private List<CasestudiesImages> casestudiesImagesList;*/

    public Casestudies() {
    }

    public Casestudies(Integer casestudyid) {
        this.casestudyid = casestudyid;
    }

    public Integer getCasestudyid() {
        return casestudyid;
    }

    public void setCasestudyid(Integer casestudyid) {
        this.casestudyid = casestudyid;
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

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Date getDateofcase() {
        return dateofcase;
    }

    public void setDateofcase(Date dateofcase) {
        this.dateofcase = dateofcase;
    }

    public Treatment getTreatmentid() {
        return treatmentid;
    }

    public void setTreatmentid(Treatment treatmentid) {
        this.treatmentid = treatmentid;
    }

    /*public List<CasestudiesImages> getCasestudiesImagesList() {
        return casestudiesImagesList;
    }

    public void setCasestudiesImagesList(List<CasestudiesImages> casestudiesImagesList) {
        this.casestudiesImagesList = casestudiesImagesList;
    }*/

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (casestudyid != null ? casestudyid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Casestudies)) {
            return false;
        }
        Casestudies other = (Casestudies) object;
        if ((this.casestudyid == null && other.casestudyid != null) || (this.casestudyid != null && !this.casestudyid.equals(other.casestudyid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Casestudies[ casestudyid=" + casestudyid + " ]";
    }
    
}

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
import java.io.Serializable;
import java.util.List;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "subspeacialization")
@NamedQueries({
    @NamedQuery(name = "Subspeacialization.findAll", query = "SELECT s FROM Subspeacialization s"),
    @NamedQuery(name = "Subspeacialization.findBySubspeacializationid", query = "SELECT s FROM Subspeacialization s WHERE s.subspeacializationid = :subspeacializationid"),
    @NamedQuery(name = "Subspeacialization.findByName", query = "SELECT s FROM Subspeacialization s WHERE s.name = :name")})
public class Subspeacialization implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "subspeacializationid")
    private Integer subspeacializationid;
    @Column(name = "name")
    private String name;
    @Lob
    @Column(name = "description")
    private String description;
    /*@OneToMany(mappedBy = "subspeacialization")
    private List<Subspeacializationimagesvideo> subspeacializationimagesvideoList;*/
    @JoinColumn(name = "speacialization", referencedColumnName = "speacializationid")
    @ManyToOne
    private Speacialization speacialization;

    public Subspeacialization() {
    }

    public Subspeacialization(Integer subspeacializationid) {
        this.subspeacializationid = subspeacializationid;
    }

    public Integer getSubspeacializationid() {
        return subspeacializationid;
    }

    public void setSubspeacializationid(Integer subspeacializationid) {
        this.subspeacializationid = subspeacializationid;
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

    /*public List<Subspeacializationimagesvideo> getSubspeacializationimagesvideoList() {
        return subspeacializationimagesvideoList;
    }

    public void setSubspeacializationimagesvideoList(List<Subspeacializationimagesvideo> subspeacializationimagesvideoList) {
        this.subspeacializationimagesvideoList = subspeacializationimagesvideoList;
    }*/

    public Speacialization getSpeacialization() {
        return speacialization;
    }

    public void setSpeacialization(Speacialization speacialization) {
        this.speacialization = speacialization;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (subspeacializationid != null ? subspeacializationid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Subspeacialization)) {
            return false;
        }
        Subspeacialization other = (Subspeacialization) object;
        if ((this.subspeacializationid == null && other.subspeacializationid != null) || (this.subspeacializationid != null && !this.subspeacializationid.equals(other.subspeacializationid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Subspeacialization[ subspeacializationid=" + subspeacializationid + " ]";
    }
    
}

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
@Table(name = "subspeacializationimagesvideo")
@NamedQueries({
    @NamedQuery(name = "Subspeacializationimagesvideo.findAll", query = "SELECT s FROM Subspeacializationimagesvideo s"),
    @NamedQuery(name = "Subspeacializationimagesvideo.findBySubspeacializationimagesid", query = "SELECT s FROM Subspeacializationimagesvideo s WHERE s.subspeacializationimagesid = :subspeacializationimagesid")})
public class Subspeacializationimagesvideo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "subspeacializationimagesid")
    private Integer subspeacializationimagesid;
    @Lob
    @Column(name = "imagevideo")
    private byte[] imagevideo;
    @Lob
    @Column(name = "imagename")
    private String imagename;
    @Lob
    @Column(name = "imagetype")
    private String imagetype;
    @JoinColumn(name = "subspeacialization", referencedColumnName = "subspeacializationid")
    @ManyToOne
    private Subspeacialization subspeacialization;

    public Subspeacializationimagesvideo() {
    }

    public Subspeacializationimagesvideo(Integer subspeacializationimagesid) {
        this.subspeacializationimagesid = subspeacializationimagesid;
    }

    public Integer getSubspeacializationimagesid() {
        return subspeacializationimagesid;
    }

    public void setSubspeacializationimagesid(Integer subspeacializationimagesid) {
        this.subspeacializationimagesid = subspeacializationimagesid;
    }

    public byte[] getImagevideo() {
        return imagevideo;
    }

    public void setImagevideo(byte[] imagevideo) {
        this.imagevideo = imagevideo;
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

    public Subspeacialization getSubspeacialization() {
        return subspeacialization;
    }

    public void setSubspeacialization(Subspeacialization subspeacialization) {
        this.subspeacialization = subspeacialization;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (subspeacializationimagesid != null ? subspeacializationimagesid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Subspeacializationimagesvideo)) {
            return false;
        }
        Subspeacializationimagesvideo other = (Subspeacializationimagesvideo) object;
        if ((this.subspeacializationimagesid == null && other.subspeacializationimagesid != null) || (this.subspeacializationimagesid != null && !this.subspeacializationimagesid.equals(other.subspeacializationimagesid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Subspeacializationimagesvideo[ subspeacializationimagesid=" + subspeacializationimagesid + " ]";
    }
    
}

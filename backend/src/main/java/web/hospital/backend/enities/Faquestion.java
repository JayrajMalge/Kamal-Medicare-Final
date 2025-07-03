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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author Jayraj Malge
 */
@Entity
@Table(name = "faquestion")
@NamedQueries({
    @NamedQuery(name = "Faquestion.findAll", query = "SELECT f FROM Faquestion f"),
    @NamedQuery(name = "Faquestion.findByFaquestionid", query = "SELECT f FROM Faquestion f WHERE f.faquestionid = :faquestionid"),
    @NamedQuery(name = "Faquestion.findByQuestion", query = "SELECT f FROM Faquestion f WHERE f.question = :question"),
    @NamedQuery(name = "Faquestion.findByAnswer", query = "SELECT f FROM Faquestion f WHERE f.answer = :answer"),
    @NamedQuery(name = "Faquestion.findByCreatat", query = "SELECT f FROM Faquestion f WHERE f.creatat = :creatat"),
    @NamedQuery(name = "Faquestion.findByAnswerat", query = "SELECT f FROM Faquestion f WHERE f.answerat = :answerat")})
public class Faquestion implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "faquestionid")
    private Integer faquestionid;
    @Column(name = "question")
    private String question;
    @Column(name = "answer")
    private String answer;
    @Column(name = "creatat")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creatat;
    @Column(name = "answerat")
    @Temporal(TemporalType.TIMESTAMP)
    private Date answerat;
    @JoinColumn(name = "user", referencedColumnName = "userid")
    @ManyToOne
    private User user;

    public Faquestion() {
    }

    public Faquestion(Integer faquestionid) {
        this.faquestionid = faquestionid;
    }

    public Integer getFaquestionid() {
        return faquestionid;
    }

    public void setFaquestionid(Integer faquestionid) {
        this.faquestionid = faquestionid;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Date getCreatat() {
        return creatat;
    }

    public void setCreatat(Date creatat) {
        this.creatat = creatat;
    }

    public Date getAnswerat() {
        return answerat;
    }

    public void setAnswerat(Date answerat) {
        this.answerat = answerat;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (faquestionid != null ? faquestionid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Faquestion)) {
            return false;
        }
        Faquestion other = (Faquestion) object;
        if ((this.faquestionid == null && other.faquestionid != null) || (this.faquestionid != null && !this.faquestionid.equals(other.faquestionid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Faquestion[ faquestionid=" + faquestionid + " ]";
    }
    
}

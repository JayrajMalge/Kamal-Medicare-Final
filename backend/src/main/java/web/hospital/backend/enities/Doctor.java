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
@Table(name = "doctor")
@NamedQueries({
    @NamedQuery(name = "Doctor.findAll", query = "SELECT d FROM Doctor d"),
    @NamedQuery(name = "Doctor.findByDoctorid", query = "SELECT d FROM Doctor d WHERE d.doctorid = :doctorid"),
    @NamedQuery(name = "Doctor.findByName", query = "SELECT d FROM Doctor d WHERE d.name = :name"),
    @NamedQuery(name = "Doctor.findByEmail", query = "SELECT d FROM Doctor d WHERE d.email = :email"),
    @NamedQuery(name = "Doctor.findByPhone", query = "SELECT d FROM Doctor d WHERE d.phone = :phone"),
    @NamedQuery(name = "Doctor.findBySchedulefrom", query = "SELECT d FROM Doctor d WHERE d.schedulefrom = :schedulefrom"),
    @NamedQuery(name = "Doctor.findByScheduleto", query = "SELECT d FROM Doctor d WHERE d.scheduleto = :scheduleto"),
    @NamedQuery(name = "Doctor.findByJoindate", query = "SELECT d FROM Doctor d WHERE d.joindate = :joindate"),
    @NamedQuery(name = "Doctor.findByResigndate", query = "SELECT d FROM Doctor d WHERE d.resigndate = :resigndate")})
public class Doctor implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "doctorid")
    private Integer doctorid;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "schedulefrom")
    private String schedulefrom;
    @Column(name = "scheduleto")
    private String scheduleto;
    @Column(name = "joindate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date joindate;
    @Column(name = "resigndate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date resigndate;
    @Lob
    @Column(name = "profilephotot")
    private byte[] profilephotot;
    @Lob
    @Column(name = "imagename")
    private String imagename;
    @Lob
    @Column(name = "imagetype")
    private String imagetype;
    @Lob
    @Column(name = "doctor")
    private String doctor;
    @Lob
    @Column(name = "about")
    private String about;
    /*@OneToMany(mappedBy = "doctor")
    private List<Education> educationList;
    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointmentList;
    @OneToMany(mappedBy = "doctor")
    private List<Experience> experienceList;
    @OneToMany(mappedBy = "doctor")
    private List<Treatmentdoctor> treatmentdoctorList;
    @OneToMany(mappedBy = "doctor")
    private List<DoctorSpeacialization> doctorSpeacializationList;*/

    public Doctor() {
    }

    public Doctor(Integer doctorid) {
        this.doctorid = doctorid;
    }

    public Integer getDoctorid() {
        return doctorid;
    }

    public void setDoctorid(Integer doctorid) {
        this.doctorid = doctorid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSchedulefrom() {
        return schedulefrom;
    }

    public void setSchedulefrom(String schedulefrom) {
        this.schedulefrom = schedulefrom;
    }

    public String getScheduleto() {
        return scheduleto;
    }

    public void setScheduleto(String scheduleto) {
        this.scheduleto = scheduleto;
    }

    public Date getJoindate() {
        return joindate;
    }

    public void setJoindate(Date joindate) {
        this.joindate = joindate;
    }

    public Date getResigndate() {
        return resigndate;
    }

    public void setResigndate(Date resigndate) {
        this.resigndate = resigndate;
    }

    public byte[] getProfilephotot() {
        return profilephotot;
    }

    public void setProfilephotot(byte[] profilephotot) {
        this.profilephotot = profilephotot;
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

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    /*public List<Education> getEducationList() {
        return educationList;
    }

    public void setEducationList(List<Education> educationList) {
        this.educationList = educationList;
    }

    public List<Appointment> getAppointmentList() {
        return appointmentList;
    }

    public void setAppointmentList(List<Appointment> appointmentList) {
        this.appointmentList = appointmentList;
    }

    public List<Experience> getExperienceList() {
        return experienceList;
    }

    public void setExperienceList(List<Experience> experienceList) {
        this.experienceList = experienceList;
    }

    public List<Treatmentdoctor> getTreatmentdoctorList() {
        return treatmentdoctorList;
    }

    public void setTreatmentdoctorList(List<Treatmentdoctor> treatmentdoctorList) {
        this.treatmentdoctorList = treatmentdoctorList;
    }

    public List<DoctorSpeacialization> getDoctorSpeacializationList() {
        return doctorSpeacializationList;
    }

    public void setDoctorSpeacializationList(List<DoctorSpeacialization> doctorSpeacializationList) {
        this.doctorSpeacializationList = doctorSpeacializationList;
    }*/

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (doctorid != null ? doctorid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Doctor)) {
            return false;
        }
        Doctor other = (Doctor) object;
        if ((this.doctorid == null && other.doctorid != null) || (this.doctorid != null && !this.doctorid.equals(other.doctorid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "web.hospital.backend.enities.Doctor[ doctorid=" + doctorid + " ]";
    }
    
}

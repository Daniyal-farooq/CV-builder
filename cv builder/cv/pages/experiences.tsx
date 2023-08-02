import { useState, useEffect } from "react";
import styles from '../styles/form2.module.css';

const SkillsForm = () => {
  const [certificateName, setCertificateName] = useState("");
  const [certificateOrganisation, setCertificateOrganisation] = useState("");
  const [certificateDate, setCertificateDate] = useState("");
  // const [certificateLevel, setCertificateLevel] = useState("Beginner");
  const [theCertificateForms, setTheCertificateForms] = useState([]); // Initialize with an empty array
  const [editCertificateIndex, setEditCertificateIndex] = useState(-1);
  const [isCertificateEditing, setIsCertificateEditing] = useState(false);

  const addCertificateHandler = () => {
    if (certificateName.trim() !== "") {
      const newCertificate = {
        name: certificateName,
        date: certificateDate,
        organisation : certificateOrganisation,
      };
      setTheCertificateForms([...theCertificateForms, newCertificate]);
      setCertificateName("");
      setCertificateDate("");
      setCertificateOrganisation("");
      // setSkillLevel("Beginner");
      setIsCertificateEditing(false);
    }
  };

  const editCertificateHandler = (index) => {
    const selectedCertificate = theCertificateForms[index];
    setCertificateName(selectedCertificate.name);
    setCertificateDate(selectedCertificate.date);
    setCertificateOrganisation(selectedCertificate.organisation)
    setEditCertificateIndex(index);
    setIsCertificateEditing(true);
  };

  const saveCertificateHandler = () => {
    if (certificateName.trim() !== "") {
      const updatedCertificateForms = [...theCertificateForms];
      if (isCertificateEditing) {
        updatedCertificateForms[editCertificateIndex] = { name: certificateName, date: certificateDate , organisation : certificateOrganisation };
      } else {
        updatedCertificateForms.push({ name: certificateName, date: certificateDate , organisation : certificateOrganisation });
      }
      setTheCertificateForms(updatedCertificateForms);
      setCertificateName("");
      setCertificateDate("")
      setCertificateOrganisation("")
      // setSkillLevel("Beginner");
      setIsCertificateEditing(false);
    }
  };

  useEffect(() => {
    const storedCertificate = localStorage.getItem("certificate");
    if (storedCertificate) {
      setTheCertificateForms(JSON.parse(storedCertificate));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("certificate", JSON.stringify(theCertificateForms));
  }, [theCertificateForms]);

  return (
    <section style={{ marginTop: "10px" }}>
      <div className="container">
        <div className="row">
          <div className={`col-12 mx-auto ${styles.backgroundColor}`}>
            <div className="row">
              <div className="col-md-4">
                <p
                  style={{
                    color: "white",
                    fontSize: "20px",
                    textAlign: "center",
                    padding: "none",
                    display: "inline",
                    marginLeft: "15px",
                  }}
                >
                  CERTIFICATE
                </p>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6" style={{}}>
                  <input
                    style={{ height: "20px", marginTop: "5px" }}
                    placeholder="Certificate name here..."
                    type="text"
                    className={`form-control ${styles.placeHolder}`}
                    id="certificateName"
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                  />
                </div>
                <div className="col-md-4" style={{}}>
                <input
                    style={{ height: "20px", marginTop: "5px" }}
                    placeholder="Certificate date here..."
                    type="text"
                    className={`form-control ${styles.placeHolder}`}
                    id="certificateDate"
                    value={certificateDate}
                    onChange={(e) => setCertificateDate(e.target.value)}
                  />
                  <input
                    style={{ height: "20px", marginTop: "5px" }}
                    placeholder="Organisation name here..."
                    type="text"
                    className={`form-control ${styles.placeHolder}`}
                    id="certificateOrganisation"
                    value={certificateOrganisation}
                    onChange={(e) => setCertificateOrganisation(e.target.value)}
                  />
                </div>
                <div className="col-md-2" style={{}}>
                  {isCertificateEditing ? (
                    <div
                      className={styles.saveGroup}
                      style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <button
                        type="button"
                        onClick={saveCertificateHandler}
                        style={{ marginTop: "3px", marginRight: "10px" }}
                        className={`${styles.animatedBtn} ${styles.btns} `}
                      >
                        <span className={styles.transition}></span>
                        <span className={styles.gradient}></span>
                        <span className={styles.label}>Save</span>
                      </button>
                    </div>
                  ) : (
                    <div className="col-12 d-flex justify-content-end">
                      <button
                        type="button"
                        onClick={addCertificateHandler}
                        style={{ marginTop: "3px" }}
                        className={`${styles.animatedBtn} ${styles.addSkillBtn}`}
                      >
                        <span className={styles.transition}></span>
                        <span className={styles.gradient}></span>
                        <span className={styles.label}>Add Certificate</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div>
                  {theCertificateForms.map((certificate, index) => (
                    <div key={index}>
                      <button
                        className={`${styles.customBtn} ${styles.btn1}`}
                        onClick={() => editCertificateHandler(index)}
                      >
                        {certificate.name} - {certificate.date}
                      </button>
                      <button
                        className={`${styles.customBtn} ${styles.crossBtn}`}
                        onClick={() => setTheCertificateForms(theCertificateForms.filter((_, i) => i !== index))}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsForm;

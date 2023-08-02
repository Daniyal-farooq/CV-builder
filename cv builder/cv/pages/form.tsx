import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import styles from '../styles/form.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
// import your icons
import { faCode, faHighlighter, faPhone, faLocation, faEnvelope, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';


type Education = {
    degree: string;
    field: string;
    institution: string;
    year: string;
};

type Experience = {
    jobTitle: string;
    companyName: string;
    starting: Date;
    ending: Date;
    ongoing: boolean;
    // tasks: string[];
};
type Certificate = {
    organisation: string;
    nameOfCertificate: string;
    issueDate: Date;
}

type Person = {
    name: string;
    contact: string;
    email: string;
    designation: string;
    linkedin: string;
    address: string;
    objective: string;
    education: Education[];
    experience: Experience[];
    certificate: Certificate[];
    skills: string[];
    languages: string[];
    reference: string;
};
const form = () => {
    const [name, setName] = useState("");
    const [link, setlink] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [objective, setObjective] = useState("");
    const [degree, setDegree] = useState("");
    const [institutionName, setInstitutionName] = useState("")
    const [field, setField] = useState("");
    const [year, setYear] = useState<Date | undefined>(undefined);
    const [jobTitle, setjobTitle] = useState("")
    const [companyName, setCompanyName] = useState("");
    const [experienceStarting, setexperienceStarting] = useState<Date | undefined>(undefined);
    const [experienceEnding, setexperienceEnding] = useState<Date | undefined>(undefined);
    const [nameOfCertificate, setNameOfCertificate] = useState("");
    const [issueDate, setIssueDate] = useState<Date | undefined>(undefined);
    const [organisation, setOrganisation] = useState("");
    const [skills, setSkills] = useState("")
    const [reference, setReference] = useState("")

    const [educationCounter, setEducationCounter] = useState(0)


    const onSubmitHandler = () => {
        const person = {
            name: name,
            link: link,
            address: address,
            designation: designation,
            email: email,
            contact: contact,
            objective: objective,
            education: [{ degree: degree, field: field, year: year, institutionName: institutionName }],
            experience: [{ jobTitle: jobTitle, companyName: companyName, experienceStarting: experienceStarting, experienceEnding: experienceEnding }],
            certificate: [{ nameOfCertificate: nameOfCertificate, issueDate: issueDate, organisation: organisation }],
            skills: skills,
            refrerence: reference,
        };
        console.log(person);

    }
    const educationIncrementHandler = () => {
        setEducationCounter(educationCounter + 1)
        var a: number = educationCounter;
    }
  
    const renderForms = () => {
        const forms = [];
    
        for (let i = 0; i < educationCounter; i++) {
          forms.push(<form key={i}><div className="container">
          <div className="row">
              <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                  <div className="row">
                      <div className="col-md-4">
                          <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>Education</p>
                      </div>
                  </div>

                  <div className="container">
                      <div className="row">
                          <div className="col-md-6" >
                              <div style={{ width: "90%", margin: "auto" }}>
                                  <form> <div className="mb-3">
                                      <label className="form-label text-white">Degree</label>
                                      <input onChange={(e) => { setDegree(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                      <label className="form-label text-white">Institution name</label>
                                      <input onChange={(e) => { setInstitutionName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                      {/* <p onClick={() => { setEducationCounter(educationCounter + 1) }} className={styles.textBtn}>+ ADD EDUCATION</p> */}

                                  </div></form>
                              </div>
                          </div>
                          <div className="col-md-6" >
                              <div style={{ width: "90%", margin: "auto" }}>
                                  <form> <div className="mb-3">
                                      <label className="form-label text-white">Field of Study</label>
                                      <input onChange={(e) => { setField(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                      <label className="form-label text-white">Year of Graduation</label>
                                      <input onChange={(e) => {
                                          const selectedDate = new Date(e.target.value);
                                          setYear(selectedDate);
                                      }} type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                  </div></form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div></form>);
        }
    
        return forms;
      };
    return (

        <>
            <main>
                <div>
                    <div>
                        <Navbar expand="md" style={{ backgroundColor: "#4FA9E3" }}>
                            <Container style={{ backgroundColor: "#4FA9E3" }} >
                                <Navbar.Brand href="#home" style={{ color: "white", fontFamily: "Montserrat" }}>Navbar</Navbar.Brand>
                                <Navbar.Toggle aria-controls="navbar-nav" />
                                <Navbar.Collapse id="navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home" style={{ color: "white", fontFamily: "Montserrat" }}>Home</Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#features" style={{ color: "white", fontFamily: "Montserrat" }}>About</Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#pricing" style={{ color: "white", fontFamily: "Montserrat" }}>Template</Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#home"></Nav.Link>
                                        <Nav.Link href="#pricing" style={{ color: "white", fontFamily: "Montserrat" }}>Feedback</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                                <Image
                                    src="/bot.jpg"
                                    width={30}
                                    height={30}
                                    alt="Picture of the author"
                                    style={{ borderRadius: "20px" }}
                                />
                            </Container>
                        </Navbar>
                    </div>
                    <div style={{ padding: "50px 0 50px 0" }}>
                        <h1 style={{ fontSize: "40px", textAlign: "center" }}>From Data to Design:</h1>
                        <h1 style={{ fontSize: "40px", textAlign: "center" }}>Craft your Perfect CV</h1>
                    </div>
                    {/* PERSONAL/BASIC INFO FORM SECTION */}
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-md-4" >
                                                <h3 style={{ color: "white", fontSize: "20px", textAlign: "center" }}>Basic information</h3>
                                                <div className={styles.inner}>
                                                    <Image
                                                        src="/white-color-solid-background-1920x1080.png"
                                                        width={100}
                                                        height={100}
                                                        alt="Picture of the author"
                                                        style={{ borderRadius: "100px" }}
                                                    />
                                                    <div style={{ color: "white" }}><FontAwesomeIcon icon={faUpload} className={styles.icon} style={{ color: "white" }} />Profile picture</div>

                                                </div>
                                            </div>
                                            <div className="col-md-8" >
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                    <div className="row">
                                                        <div className="col-md-6" >
                                                            <div className={styles.inner2}>
                                                                <form> <div className="mb-3">
                                                                    <label className="form-label text-white">Name</label>
                                                                    <input onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    <label className="form-label text-white">LinkedIn Profile Link</label>
                                                                    <input onChange={(e) => { setlink(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    <label className="form-label text-white">Address</label>
                                                                    <input onChange={(e) => { setAddress(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                </div></form>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6" >
                                                            <div className={styles.inner2}>
                                                                <form> <div className="mb-3">
                                                                    <label className="form-label text-white">Designation</label>
                                                                    <input onChange={(e) => { setDesignation(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    <label className="form-label text-white">Email address</label>
                                                                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    <label className="form-label text-white">Contact</label>
                                                                    <input onChange={(e) => { setContact(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                </div></form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12" >
                                                            <div className="mb-3">
                                                                <label className="form-label text-white">Objective</label>
                                                                <textarea onChange={educationIncrementHandler} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* EDUCATION */}
                    
                    <section style={{ marginTop: "50px" }}>
                        <div className="container">
                            <div className="row">
                                <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>Education</p>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6" >
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                    <form> <div className="mb-3">
                                                        <label className="form-label text-white">Degree</label>
                                                        <input onChange={(e) => { setDegree(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                        <label className="form-label text-white">Institution name</label>
                                                        <input onChange={(e) => { setInstitutionName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                        {/* <p onClick={() => { setEducationCounter(educationCounter + 1) }} className={styles.textBtn}>+ ADD EDUCATION</p> */}

                                                    </div></form>
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                    <form> <div className="mb-3">
                                                        <label className="form-label text-white">Field of Study</label>
                                                        <input onChange={(e) => { setField(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                        <label className="form-label text-white">Year of Graduation</label>
                                                        <input onChange={(e) => {
                                                            const selectedDate = new Date(e.target.value);
                                                            setYear(selectedDate);
                                                        }} type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    </div></form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         {renderForms()}

                        <p onClick={() => { setEducationCounter(educationCounter + 1) }} className={styles.textBtn}>+ ADD EDUCATION</p>
                    </section>











                    {/* EXPERIENCE */}
                    <section style={{ marginTop: "50px" }}>
                        <div className="container">
                            <div className="row">
                                <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                    <div className="row"> <div className="col-4">
                                        <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>Work Experience</p>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div style={{ width: "90%", margin: "auto" }}>
                                                <form> <div className="mb-3">
                                                    <label className="form-label text-white">Job Title</label>
                                                    <input onChange={(e) => { setjobTitle(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                                    <div className="form-check d-flex justify-content-center" style={{ textAlign: "center", color: "white", marginTop: "20px" }}>
                                                        <input className={`form-check-input ${styles.inpt}`} type="checkbox" value="" id="flexCheckDefault" style={{ borderRadius: "6px", width: "15px", height: "15px", marginRight: "10px" }} />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            I am currently in this role.
                                                        </label>
                                                    </div>
                                                </div></form>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{ width: "90%", margin: "auto", height: "92%" }}>
                                                <form> <div className="mb-3">
                                                    <label className="form-label text-white">Company Name</label>
                                                    <input onChange={(e) => { setCompanyName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                    <div className={styles.probINpt} style={{}}>
                                                    </div>

                                                </div></form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div style={{ width: "90%", margin: "auto" }}>
                                                <form> <div className="mb-3">
                                                    <label className="form-label text-white">Starting Date</label>
                                                    <input onChange={(e) => {
                                                        const selectedDate = new Date(e.target.value);
                                                        setexperienceStarting(selectedDate);
                                                    }} type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{}} />

                                                    <div className="form-check d-flex justify-content-center" style={{ textAlign: "center", color: "white", marginTop: "20px" }}>

                                                    </div>
                                                </div></form>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div style={{ width: "90%", margin: "auto" }}>
                                                <form> <div className="mb-3">
                                                    <label className="form-label text-white">Ending Date</label>
                                                    <input onChange={(e) => {
                                                        const selectedDate = new Date(e.target.value);
                                                        setexperienceEnding(selectedDate);
                                                    }} type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" style={{}} />

                                                    <div className="form-check d-flex justify-content-center" style={{ textAlign: "center", color: "white", marginTop: "20px" }}>

                                                    </div>
                                                </div></form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>
                    </section>



                    {/* CERTIFICATES */}
                    <section style={{ marginTop: "50px" }}>
                        <div className="container">
                            <div className="row">
                                <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>Certificate</p>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6" >
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                    <form> <div className="mb-3">
                                                        <label className="form-label text-white">Name</label>
                                                        <input onChange={(e) => { setNameOfCertificate(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                        <label className="form-label text-white">Issue Date</label>
                                                        <input onChange={(e) => {
                                                            const selectedDate = new Date(e.target.value);
                                                            setIssueDate(selectedDate);
                                                        }} type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                                    </div></form>
                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div style={{ width: "90%", margin: "auto" }}>
                                                    <form> <div className="mb-3">
                                                        <label className="form-label text-white">Issuing Organization</label>
                                                        <input onChange={(e => { setOrganisation(e.target.value) })} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                                    </div></form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* SKILLS */}
                    <section style={{ marginTop: "50px" }}>
                        <div className="container">
                            <div className="row">
                                <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>Skills</p>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">

                                            <div className="col-md-12" >
                                                <div style={{ margin: "auto" }}>
                                                    <form> <div className="mb-3">
                                                        <textarea onChange={(e) => { setSkills(e.target.value) }} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                                                    </div></form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* REFERENCE */}
                    <section style={{ marginTop: "50px" }}>
                        <div className="container">
                            <div className="row">
                                <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>References</p>
                                        </div>
                                    </div>

                                    <div className="container">
                                        <div className="row">

                                            <div className="col-md-12" >
                                                <div style={{ margin: "auto" }}>
                                                    <form> <div className="mb-3">
                                                        <textarea onChange={(e) => { setReference(e.target.value) }} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                                                    </div></form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section style={{ marginTop: "50px" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6" style={{}}><div onClick={onSubmitHandler} className={`${styles.btn} ${styles.btn2}`} style={{ marginLeft: "auto", borderRadius: "5px" }}>View resume</div></div>
                                <div className="col-md-6" style={{}}><div className={styles.btn} style={{ borderRadius: "5px", border: "2px solid #2578AC", color: "#2578AC" }}>Cancel</div></div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>
    )
}

export default form
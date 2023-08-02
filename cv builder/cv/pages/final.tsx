import React, { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
import styles from '../styles/form2.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
// import your icons
import { faCode, faHighlighter, faPhone, faLocation, faEnvelope, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { storage } from '../database'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import Router from 'next/router';


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
type Skill = {
    title: string,
    level: string,
}
type Language = {
    languageName: string,
}

type Person = {
    imageURL: string,
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
    skills: Skill[];
    languages: Language[];
    reference: string;
};
const form2 = () => {
    const [uploadError , setUploadError] = useState(false)
    const [imageURL, setImageURL] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null);
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
    // const [skills, setSkills] = useState("")
    const [reference, setReference] = useState("")
    const [languageForms , setLanguageForms] = useState([
        {
            languageName:"",
        }
    ])

    const [educationCounter, setEducationCounter] = useState(0)
    const [educationForms, setEducationForms] = useState([
        {
            institution: "",
            year: "",
            degree: "",
            field: "",
        }
    ]);

    const [experienceForms, setExperienceForms] = useState([
        {
            jobTitle: "",
            companyName: "",
            experienceStarting: "",
            experienceEnding: "",
        }
    ])
    const [certificateForms, setCertificateForms] = useState([
        {
            nameOfCertificate: "",
            organisation: "",
            issueDate: "",
        }
    ])
    const [skillForms, setSkillForms] = useState([
        {
            title: "",
            level: "",
        }
    ])
    const onSubmitHandler = async () => {
        
        if (!name || !address || !email || !contact ) {
            console.log("Enter name, address, email, contact and objective");
            setUploadError(true);
            
        } else {
            setUploadError(false)
        const storageRef = ref(storage, 'images/' + imageFile.name);


        await uploadBytes(storageRef, imageFile);
        console.log('Image uploaded successfully!');

        const Url = await getDownloadURL(storageRef);
        console.log('Image at firebase URL:', Url);
       
        // Save the imageUrl to your database or use it as needed



        const person = {
            imageURL: Url,
            name: name,
            link: link,
            address: address,
            designation: designation,
            email: email,
            contact: contact,
            language : languageForms.map((form)=>({
                languageName: form.languageName,
            })),
            objective: objective,
            education: educationForms.map((form) => ({
                degree: form.degree,
                field: form.field,
                year: form.year,
                institutionName: form.institution,
            })),
            experience: experienceForms.map((form) => ({
                jobTitle: form.jobTitle,
                companyName: form.companyName,
                experienceStarting: form.experienceStarting,
                experienceEnding: form.experienceEnding,
            }))
            // experience: [{ jobTitle: jobTitle, companyName: companyName, experienceStarting: experienceStarting, experienceEnding: experienceEnding }],
            ,
            certificate: certificateForms.map((form) => ({
                nameOfCertificate: form.nameOfCertificate,
                issueDate: form.issueDate,
                organisation: form.organisation,
            })),
            // certificate: [{ nameOfCertificate: nameOfCertificate, issueDate: issueDate, organisation: organisation }],
            skill: skillForms.map((form) => ({
                title: form.title,
                level: form.level,
            })),
            reference: reference,
        };

        console.log(person);
        // const response = await axios.post("http://localhost:8000/generate" , person)
        // console.log(response.data);
        const personString = JSON.stringify(person);
        localStorage.setItem("draft",personString);
        Router.push('/Viewall')


        const response = await axios.post('http://localhost:8000/render-html-final', {
            imageURL: Url,
            name: name,
            link: link,
            address: address,
            designation: designation,
            email: email,
            contact: contact,
            language : languageForms.map((form)=>({
                languageName: form.languageName,
            })),
            objective: objective,
            education: educationForms.map((form) => ({
                degree: form.degree,
                field: form.field,
                year: form.year,
                institutionName: form.institution,
            })),
            experience: experienceForms.map((form) => ({
                jobTitle: form.jobTitle,
                companyName: form.companyName,
                experienceStarting: form.experienceStarting,
                experienceEnding: form.experienceEnding,
            }))
            // experience: [{ jobTitle: jobTitle, companyName: companyName, experienceStarting: experienceStarting, experienceEnding: experienceEnding }],
            ,
            certificate: certificateForms.map((form) => ({
                nameOfCertificate: form.nameOfCertificate,
                issueDate: form.issueDate,
                organisation: form.organisation,
            })),
            // certificate: [{ nameOfCertificate: nameOfCertificate, issueDate: issueDate, organisation: organisation }],
            skill: skillForms.map((form) => ({
                title: form.title,
                level: form.level,
            })),
            reference: reference,
      }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link2 = document.createElement('a');
      link2.href = url;
      link2.setAttribute('download', 'dynamic-resume.pdf');
      document.body.appendChild(link2);
      link2.click();
      
        
        }

        
    };

    const handleSelectedFile = (files: any) => {
        if (files && files[0].size < 10000000) {
            setImageFile(files[0])

            console.log(files[0])
        } else {
            console.log('File size to large')
        }
    }

    const educationIncrementHandler = () => {
        setEducationForms([...educationForms, { institution: "", year: "", degree: "", field: "" }]);
    };

    const educationChangeHandler = (index, field, value) => {
        const updatedEducationForms = [...educationForms];
        updatedEducationForms[index] = {
            ...updatedEducationForms[index],
            [field]: value
        };
        setEducationForms(updatedEducationForms);
    };
    // experience
    const experienceIncrementHandler = () => {
        setExperienceForms([...experienceForms, { jobTitle: "", companyName: "", experienceStarting: "", experienceEnding: "" }]);
    };

    const experienceChangeHandler = (index, field, value) => {
        const updatedExperienceForms = [...experienceForms];
        updatedExperienceForms[index] = {
            ...updatedExperienceForms[index],
            [field]: value
        };
        setExperienceForms(updatedExperienceForms);
    };
    //certificate
    const certificateIncrementHandler = () => {
        setCertificateForms([...certificateForms, { nameOfCertificate: "", organisation: "", issueDate: "" }]);
    };
    const certificateChangeHandler = (index, field, value) => {
        const updatedCertificateForms = [...certificateForms];
        updatedCertificateForms[index] = {
            ...updatedCertificateForms[index],
            [field]: value
        };
        setCertificateForms(updatedCertificateForms);
    };
    // skill
    const skillIncrementHandler = () => {
        setSkillForms([...skillForms, { title: "", level: "" }]);
    };
    const skillChangeHandler = (index, field, value) => {
        const updatedskillForms = [...skillForms];
        updatedskillForms[index] = {
            ...updatedskillForms[index],
            [field]: value
        };
        setSkillForms(updatedskillForms);
    };
    //language
    const languageIncrementHandler = () => {
        setLanguageForms([...languageForms, { languageName: "" }]);
    };
    const languageChangeHandler = (index, field, value) => {
        const updatedLanguageForms = [...languageForms];
        updatedLanguageForms[index] = {
            ...updatedLanguageForms[index],
            [field]: value
        };
        setLanguageForms(updatedLanguageForms);
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
                                                    {imageFile? <Image src={URL.createObjectURL(imageFile)} alt="Selected Image" height={100} width={100} style={{ borderRadius: "100px" }} />:<Image
                                                        src="/white-color-solid-background-1920x1080.png"
                                                        width={100}
                                                        height={100}
                                                        alt="Picture of the author"
                                                        style={{ borderRadius: "100px" }}
                                                    />}
                                                   <input type="file" accept="image/*" onChange={(files) => handleSelectedFile(files.target.files)} />
                                                    {/* <div style={{ color: "white" }}><FontAwesomeIcon icon={faUpload} className={styles.icon} style={{ color: "white" }} />Profile picture</div> */}

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
                                                                    {uploadError && <p className={styles.required}>Name required</p>}
                                                                    <label className="form-label text-white">LinkedIn Profile Link</label>
                                                                    <input onChange={(e) => { setlink(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    <label className="form-label text-white">Address</label>
                                                                    <input onChange={(e) => { setAddress(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    {uploadError && <p className={styles.required}>Address required</p>}
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
                                                                    {uploadError && <p className={styles.required}>Email required</p>}
                                                                    <label className="form-label text-white">Contact</label>
                                                                    <input onChange={(e) => { setContact(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                                    {uploadError && <p className={styles.required}>Contact required</p>}
                                                                </div></form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12" >
                                                            <div className="mb-3">
                                                                <label className="form-label text-white">Objective</label>
                                                                <textarea onChange={(e) => { setObjective(e.target.value) }} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
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
                        {educationForms.map((educationForm, index) => (
                            <div key={index} style={{ marginTop: "50px" }}>
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
                                                                <label className="form-label text-white" htmlFor={`year${index}`}>Degree:</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`degree${index}`}
                                                                    value={educationForm.degree}
                                                                    onChange={(e) =>
                                                                        educationChangeHandler(index, "degree", e.target.value)
                                                                    }
                                                                />
                                                                <label className="form-label text-white" htmlFor={`institution${index}`}>Institution:</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`institution${index}`}
                                                                    value={educationForm.institution}
                                                                    onChange={(e) =>
                                                                        educationChangeHandler(index, "institution", e.target.value)
                                                                    }
                                                                />
                                                                {/* <p onClick={() => { setEducationCounter(educationCounter + 1) }} className={styles.textBtn}>+ ADD EDUCATION</p> */}

                                                            </div></form>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6" >
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                            <form> <div className="mb-3">
                                                                <label className="form-label text-white" htmlFor={`field${index}`}>Field:</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`field${index}`}
                                                                    value={educationForm.field}
                                                                    onChange={(e) =>
                                                                        educationChangeHandler(index, "field", e.target.value)
                                                                    }
                                                                />
                                                                <label className="form-label text-white" htmlFor={`year${index}`}>Year:</label>
                                                                <input type="date" className="form-control" aria-describedby="emailHelp"

                                                                    id={`year${index}`}
                                                                    value={educationForm.year}
                                                                    onChange={(e) =>
                                                                        educationChangeHandler(index, "year", e.target.value)
                                                                    }
                                                                />
                                                            </div></form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={educationIncrementHandler}>Add Education</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>




                    {/* dynamic experience certificates */}
                    <section style={{ marginTop: "50px" }}>
                        {experienceForms.map((experienceForm, index) => (
                            <div key={index} style={{ marginTop: "50px" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>Experience</p>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6" >
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                            <form> <div className="mb-3">
                                                                <label className="form-label text-white" htmlFor={`title${index}`}>Job title</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`jobTitle${index}`}
                                                                    value={experienceForm.jobTitle}
                                                                    onChange={(e) =>
                                                                        experienceChangeHandler(index, "jobTitle", e.target.value)
                                                                    }
                                                                />
                                                                <label className="form-label text-white" htmlFor={`companyName${index}`}>companyName:</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`companyName${index}`}
                                                                    value={experienceForm.companyName}
                                                                    onChange={(e) =>
                                                                        experienceChangeHandler(index, "companyName", e.target.value)
                                                                    }
                                                                />
                                                                {/* <p onClick={() => { setEducationCounter(educationCounter + 1) }} className={styles.textBtn}>+ ADD EDUCATION</p> */}

                                                            </div></form>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6" >
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                            <form> <div className="mb-3">
                                                                <label className="form-label text-white" htmlFor={`experienceStarting${index}`}>experienceStarting:</label>
                                                                <input type="date" className="form-control" aria-describedby="emailHelp"

                                                                    id={`experienceStarting${index}`}
                                                                    value={experienceForm.experienceStarting}
                                                                    onChange={(e) =>
                                                                        experienceChangeHandler(index, "experienceStarting", e.target.value)
                                                                    }
                                                                />
                                                                <label className="form-label text-white" htmlFor={`experienceEnding${index}`}>experienceEnding:</label>
                                                                <input type="date" className="form-control" aria-describedby="emailHelp"

                                                                    id={`experienceEnding${index}`}
                                                                    value={experienceForm.experienceEnding}
                                                                    onChange={(e) =>
                                                                        experienceChangeHandler(index, "experienceEnding", e.target.value)
                                                                    }
                                                                />
                                                            </div></form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={experienceIncrementHandler}>Add Experiencce</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </section>



              

                    {/* dynamic certificate forms */}
                    <section style={{ marginTop: "50px" }}>
                        {certificateForms.map((certificateForm, index) => (
                            <div key={index} style={{ marginTop: "50px" }}>
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
                                                                <label htmlFor={`nameOfCertificate${index}`} className="form-label text-white">nameOfCertificate</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`nameOfCertificate${index}`}
                                                                    value={certificateForm.nameOfCertificate}
                                                                    onChange={(e) =>
                                                                        certificateChangeHandler(index, "nameOfCertificate", e.target.value)
                                                                    } />
                                                                <label htmlFor={`issueDate${index}`} className="form-label text-white">issueDate</label>
                                                                <input type="date" className="form-control" aria-describedby="emailHelp"

                                                                    id={`issueDate${index}`}
                                                                    value={certificateForm.issueDate}
                                                                    onChange={(e) =>
                                                                        certificateChangeHandler(index, "issueDate", e.target.value)
                                                                    } />

                                                            </div></form>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6" >
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                            <form> <div className="mb-3">
                                                                <label htmlFor={`organisation${index}`} className="form-label text-white">organisation</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`organisation${index}`}
                                                                    value={certificateForm.organisation}
                                                                    onChange={(e) =>
                                                                        certificateChangeHandler(index, "organisation", e.target.value)
                                                                    } />

                                                            </div></form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={certificateIncrementHandler}>Add Certificate</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>))}</section>



                    {/* SKILLS */}
                    {/* <section style={{ marginTop: "50px" }}>
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
                    </section> */}

                    {/* dynamic skill */}
                    <section style={{ marginTop: "50px" }}>
                        {skillForms.map((skillForm, index) => (
                            <div key={index} style={{ marginTop: "50px" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>SKILLS</p>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6" >
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                            <form> <div className="mb-3">
                                                                <label htmlFor={`title${index}`} className="form-label text-white">Title</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`title${index}`}
                                                                    value={skillForm.title}
                                                                    onChange={(e) =>
                                                                        skillChangeHandler(index, "title", e.target.value)
                                                                    } />

                                                            </div></form>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6" >
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                            <form> <div className="mb-3">
                                                                <label htmlFor={`level${index}`} className="form-label text-white">level</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`level${index}`}
                                                                    value={skillForm.level}
                                                                    onChange={(e) =>
                                                                        skillChangeHandler(index, "level", e.target.value)
                                                                    } />

                                                            </div></form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={skillIncrementHandler}>Add Skill</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>))}</section>
                            {/* dynamic language */}
                            <section style={{ marginTop: "50px" }}>
                            {languageForms.map((languageForm, index) => (
                            <div key={index} style={{ marginTop: "50px" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className={`col-8 mx-auto ${styles.backgroundColor}`} >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <p style={{ color: "white", fontSize: "20px", textAlign: "center" }}>LANGUAGES</p>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                        <form> <div className="mb-3">
                                                                <label htmlFor={`languageName${index}`} className="form-label text-white">Name</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`languageName${index}`}
                                                                    value={languageForm.languageName}
                                                                    onChange={(e) =>
                                                                        languageChangeHandler(index, "languageName", e.target.value)
                                                                    } />

                                                            </div></form>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6" >
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                            <form> <div className="mb-3">
                                                                <label htmlFor={`title${index}`} className="form-label text-white">Title</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`title${index}`}
                                                                    value={skillForm.title}
                                                                    onChange={(e) =>
                                                                        skillChangeHandler(index, "title", e.target.value)
                                                                    } />

                                                            </div></form>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6" >
                                                        <div style={{ width: "90%", margin: "auto" }}>
                                                            <form> <div className="mb-3">
                                                                <label htmlFor={`level${index}`} className="form-label text-white">level</label>
                                                                <input type="text" className="form-control" aria-describedby="emailHelp"

                                                                    id={`level${index}`}
                                                                    value={skillForm.level}
                                                                    onChange={(e) =>
                                                                        skillChangeHandler(index, "level", e.target.value)
                                                                    } />

                                                            </div></form>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <button onClick={languageIncrementHandler}>Add Skill</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>))}
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

export default form2
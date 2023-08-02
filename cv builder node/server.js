const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PDFDocument = require('pdfkit');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const pdf = require('html-pdf');


// app.set('view engine' , 'ejs');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use(cors({
  allowedHeaders: ['Content-Type'],
}));

// app.use(cors({
//   origin: 'https://localhost:3000'
// }));
const htmlToPdf = require('html-pdf');

main();

async function main() {
  try {
    const connection = await mongoose.connect("mongodb+srv://events:RR9eKLMDSeG4zB2w@cluster0.cz7iwrh.mongodb.net/");
    console.log("Connection successful on port 8000");
  } catch (error) {
    console.log("Connection error", error);
  }
}

const authSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const usersCollection = mongoose.model("cvusers", authSchema);

const educationSchema = new mongoose.Schema({
  degree: String,
  field: String,
  year: String,
  institutionName: String,
});

const languageSchema = new mongoose.Schema({
  languageName: String,
});

const experienceSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  experienceStarting: Date,
  experienceEnding: Date,
});

const certificateSchema = new mongoose.Schema({
  name: String,
  date: Date,
  nameOfCertificate: String,
});

const skillSchema = new mongoose.Schema({
  name: String,
  level: String,
});

const personSchema = new mongoose.Schema({
  imageURL: String,
  name: String,
  contact: String,
  email: String,
  designation: String,
  linkedin: String,
  address: String,
  objective: String,
  education: [educationSchema],
  experience: [experienceSchema],
  certificate: [certificateSchema],
  skill: [skillSchema],
  // languages: [languageSchema],
  language: [String],
  reference: String,
});

const PersonCollection = mongoose.model('Person', personSchema);

app.post("/createUser", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    console.log("password simple ", password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new usersCollection({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const savedUser = await usersCollection.findOne({ email: email });
    console.log(process.env.secretkey);
    const token = jwt.sign({ email: savedUser.email, firstname: savedUser.firstname, lastname: savedUser.lastname }, process.env.secretkey);
    res.send({
      "status": "success",
      "token": token
    });
  } catch (error) {
    console.log("Not added to db", error);
  }
});

app.post("/login", async (req, res) => {

  const { email, password } = req.body
  console.log("email : ", email, "*****  password", password);
  if (email && password) {
    const user = await usersCollection.findOne({ email: email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (user.email == email && match) {
        const token = jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, process.env.secretkey);
        res.send({
          status: "success",
          message: "Cyborg",
          token: token,
        });
      } else {
        res.send({
          status: "Failed incorrect",
          message: "Email or password is incorrect"
        });
        console.log("Email or password is incorrect");
      }
    } else {
      res.send({
        status: "Failed not registered",
        message: "Email or password is not registered"
      });
      console.log("Email or password is not registered");
    }
  } else {
    res.send({
      status: "Failed fill all fields",
      message: "Please fill all fields"
    });
  }
});

app.post("/authorization", async (req, res) => {
  console.log("triggered authhh");
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const userjwt = await jwt.verify(token, process.env.secretkey)
      if (userjwt) {
        res.send({
          status: "success",
          user: userjwt,
        })
      } else {
        res.send({
          status: "Failed",
          message: "please give correct id",
        })
      }
    } catch (error) {
      console.log(error.message);
      res.send({
        status: "Failed",
        message: "please give correct id",
      })
    }
  }
  else {
    res.send({
      status: "Failed",
      message: "please give correct id",
    })
  }
})


app.post("/generate", async (req, res) => {
  const { imageURL, name, link, address, designation, email, contact, language, objective, education, experience, certificate, skill, reference } = req.body;
  const person = {
    imageURL,
    name,
    link,
    address,
    designation,
    email,
    contact,
    language,
    objective,
    education,
    experience,
    certificate,
    skill,
    reference
  }
  console.log("person recieved in node : ", person);

  try {
    const newCV = new PersonCollection({
      imageURL,
      name,
      link,
      address,
      designation,
      email,
      contact,
      language,
      objective,
      education,
      experience,
      certificate,
      skill,
      reference
    });
    await newCV.save();
    const savedCV = await usersCollection.findOne({ name: name });
    console.log("savedCV : ", savedCV);
  } catch (error) {
    console.log(error);
  }
  res.send({
    status: "success",
    message: "person2 passed to node",
  })
})

app.post('/getDraft', async (req, res) => {
  const token = req.body;
  console.log(token);
  try {
    // Verify and decode the token to access the user's email
    const decodedToken = jwt.verify(token, process.env.secretkey);
    const userEmail = decodedToken.email;
    console.log("decoded email is : ", userEmail);
    // Now use the userEmail to fetch relevant data for the user from your database
    // For example:
    const userData = await usersCollection.findOne({ email: userEmail });

    if (userData) {
      // If user data is found, send it back to the client
      res.send({
        status: "success",
        data: userData
      });
    } else {
      // If user data is not found, send an appropriate response
      res.send({
        status: "Failed",
        message: "User data not found"
      });
    }
  } catch (error) {
    console.error(error);
    res.send({
      status: "Failed",
      message: "Invalid token or token expired"
    });
  }
});
app.listen(8000);

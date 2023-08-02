import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

const Template1 = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const person = {name:"DANI"}

  const generatePDF = async () => {
    try {
      const response = await axios.post('http://localhost:8000/download', { html: htmlContent }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  useEffect(() => {
    // Fetch or generate the HTML content here
    const fetchHtmlContent = async () => {
      // Make the necessary API calls or generate the HTML content dynamically
      const fetchedHtml = `
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-pzjw8+ua8j6FfHy4z8v5G1wVj5gBbCADm1lgmC2KrO2suR3kk5YEXuhfCI4A4k1x"
            crossorigin="anonymous"
          />
          <style>
            .pink {
              background-color: pink;
              font-size: 20px;
            }
            .img {
              height: 50px;
              width: 50px;
            }
            .custom-container {
              max-width: 1140px;
              margin: 0 auto;
              padding: 15px;
              background-color: blue;
            }
          </style>
        </head>
        <body>
          <div class="container custom-container">
            <div class="row">
              <div class="col-4"><p class="pink">hey</p></div>
              <div class="col-4"><p class="pink">hey</p></div>
              <div class="col-4"><p class="pink">hey</p></div>
            </div>
            <div class="row">
              <div class="col-4">s</div>
              <div class="col-4">s</div>
              <div class="col-4">s</div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    




      setHtmlContent(fetchedHtml);
    };

    fetchHtmlContent();
  }, []);

  return (
    <div>
      <Head>
        <title>Template 1</title>
      </Head>
      <h1>Your Selected Template</h1>
      <button type="button" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
};

export default Template1;

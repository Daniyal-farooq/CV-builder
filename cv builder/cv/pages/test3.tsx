import React, { useState } from 'react';
import axios from 'axios';

const RenderHTML = () => {
  const [pdfData, setPdfData] = useState('');

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post('http://localhost:8000/render-html', {
        name: 'John Doe',
        number: '1234567890',
      }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'dynamic-resume.pdf');
      document.body.appendChild(link);
      link.click();
      setPdfData(response.data);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      <h1>Your Selected Template</h1>
      <button type="button" onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default RenderHTML;

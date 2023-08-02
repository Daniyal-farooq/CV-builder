import React from 'react';
import axios from 'axios';

const Test2 = () => {
  
  const handleRenderHome = async () => {
    try {
      const response = await axios.get('/api/home'); // Use the API route in your Next.js app
      document.open();
      document.write(response.data);
      document.close();
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Test2 Page</h1>
      <button onClick={handleRenderHome}>Render Home Page</button>
      {/* Add any additional content or components */}
    </div>
  );
};

export default Test2;

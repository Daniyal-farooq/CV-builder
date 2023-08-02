import { useState, useEffect } from 'react';

export default function LanguageForm() {
  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const storedLanguages = localStorage.getItem('languages');
    if (storedLanguages) {
      setLanguages(JSON.parse(storedLanguages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('languages', JSON.stringify(languages));
  }, [languages]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLanguageAdd = () => {
    if (language.trim() !== '') {
      setLanguages([...languages, language]);
      setLanguage('');
    }
  };

  const handleLanguageRemove = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(languages);
    localStorage.setItem("lang" , languages);
    console.log("LANGS ::" , localStorage.getItem("lang"));
    
  };

  return (
    <div>
      <h1>Add Languages</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter language name"
            value={language}
            onChange={handleLanguageChange}
          />
          <button type="button" onClick={handleLanguageAdd}>Add</button>
        </div>
        <div>
          {languages.map((lang, index) => (
            <button key={index} onClick={() => handleLanguageRemove(index)}>
              {lang}
            </button>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

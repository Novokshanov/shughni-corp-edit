import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TextList = () => {
  const [texts, setTexts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/texts');
        setTexts(response.data);
      } catch (error) {
        console.error('Error fetching texts:', error);
      }
    };

    fetchTexts();
  }, []);

  const handleSelectText = (text) => {
    navigate(`/editor/${text}`);
  };

  return (
    <div>
      <h2>  Available Texts</h2>
      {texts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {texts.map((text, index) => (
            <li key={index} onClick={() => handleSelectText(text)} style={{ cursor: 'pointer' }}>
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TextList;
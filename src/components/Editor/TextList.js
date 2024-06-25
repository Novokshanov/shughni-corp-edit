import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = 'https://novokshanov-shughni-corp-edit-975b.twc1.net';

const TextList = () => {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/texts`);
        console.log('Response data:', response.data);
        if (Array.isArray(response.data)) {
          setTexts(response.data);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        console.error('Error fetching texts:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTexts();
  }, []);

  const handleSelectText = (text) => {
    navigate(`/editor/${text}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading texts: {error.message}</p>;
  }

  return (
    <div>
      <h2>Available Texts</h2>
      {texts.length === 0 ? (
        <p>No texts available</p>
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

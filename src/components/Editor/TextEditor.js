import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #007BFF;
`;

const MetaSection = styled.div`
  margin-bottom: 20px;
`;

const MetaItem = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const Input = styled.input`
  padding: 5px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SentenceContainer = styled.div`
  margin-bottom: 20px;
`;

const WordContainer = styled.div`
  margin-bottom: 20px;
`;

const AnalysisContainer = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
`;

const NoAnalysis = styled.p`
  color: #ff0000;
`;

const apiBaseUrl = 'https://novokshanov-shughni-corp-edit-975b.twc1.net/api';

const TextEditor = () => {
  const { filename } = useParams();
  const [meta, setMeta] = useState({});
  const [sentences, setSentences] = useState([]);
  const [expandedSentence, setExpandedSentence] = useState(null);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/texts/${filename}`);
        const jsonData = JSON.parse(response.data.text);
        setMeta(jsonData.meta);
        setSentences(jsonData.sentences);
      } catch (error) {
        console.error('Error fetching text:', error);
      }
    };

    fetchText();
  }, [filename]);

  const handleSave = async () => {
    try {
      const dataToSave = { meta, sentences };
      await axios.put(`${apiBaseUrl}/texts/${filename}`, dataToSave);
      alert('File saved successfully');
    } catch (error) {
      console.error('Error saving text:', error);
    }
  };

  const handleMetaChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const handleSentenceChange = (index, key, value) => {
    const newSentences = [...sentences];
    newSentences[index][key] = value;
    setSentences(newSentences);
  };

  const handleWordChange = (sentenceIndex, wordIndex, key, value) => {
    const newSentences = [...sentences];
    newSentences[sentenceIndex].words[wordIndex][key] = value;
    setSentences(newSentences);
  };

  const handleAnalysisChange = (sentenceIndex, wordIndex, anaIndex, key, value) => {
    const newSentences = [...sentences];
    const newAna = [...newSentences[sentenceIndex].words[wordIndex].ana];
    newAna[anaIndex][key] = value;
    newSentences[sentenceIndex].words[wordIndex].ana = newAna;
    setSentences(newSentences);
  };

  const toggleSentence = (index) => {
    setExpandedSentence(expandedSentence === index ? null : index);
  };

  return (
    <Container>
      <Title>You edit: {filename}</Title>
      <MetaSection>
        <h2>Meta Information</h2>
        {Object.keys(meta).map((key) => (
          <MetaItem key={key}>
            <Label>{key}: </Label>
            <Input
              type="text"
              name={key}
              value={meta[key]}
              onChange={handleMetaChange}
            />
          </MetaItem>
        ))}
      </MetaSection>
      <div>
        <h2>Sentences</h2>
        {sentences.map((sentence, index) => (
          <SentenceContainer key={index}>
            <Label>{index + 1}: </Label>
            <TextArea
              value={sentence.text}
              onChange={(e) => handleSentenceChange(index, 'text', e.target.value)}
              rows={4}
            />
            <Button onClick={() => toggleSentence(index)}>Подробнее</Button>
            {expandedSentence === index && (
              <div>
                {sentence.words.map((word, wordIndex) => (
                  <WordContainer key={wordIndex}>
                    <Label>Word: </Label>
                    <Input
                      type="text"
                      value={word.wf}
                      onChange={(e) => handleWordChange(index, wordIndex, 'wf', e.target.value)}
                    />
                    <AnalysisContainer>
                      {word.ana ? word.ana.map((ana, anaIndex) => (
                        <div key={anaIndex}>
                          <Label>Parts: </Label>
                          <Input
                            type="text"
                            value={ana.parts}
                            onChange={(e) => handleAnalysisChange(index, wordIndex, anaIndex, 'parts', e.target.value)}
                          />
                          <Label>POS: </Label>
                          <Input
                            type="text"
                            value={ana['gr.pos']}
                            onChange={(e) => handleAnalysisChange(index, wordIndex, anaIndex, 'gr.pos', e.target.value)}
                          />
                          <Label>Gloss: </Label>
                          <Input
                            type="text"
                            value={ana.gloss}
                            onChange={(e) => handleAnalysisChange(index, wordIndex, anaIndex, 'gloss', e.target.value)}
                          />
                          <Label>Lex: </Label>
                          <Input
                            type="text"
                            value={ana.lex}
                            onChange={(e) => handleAnalysisChange(index, wordIndex, anaIndex, 'lex', e.target.value)}
                          />
                          <Label>Translation: </Label>
                          <Input
                            type="text"
                            value={ana.trans_en}
                            onChange={(e) => handleAnalysisChange(index, wordIndex, anaIndex, 'trans_en', e.target.value)}
                          />
                        </div>
                      )) : (
                        <NoAnalysis>No analysis available for this word.</NoAnalysis>
                      )}
                    </AnalysisContainer>
                  </WordContainer>
                ))}
              </div>
            )}
          </SentenceContainer>
        ))}
      </div>
      <Button onClick={handleSave}>Save</Button>
    </Container>
  );
};

export default TextEditor;

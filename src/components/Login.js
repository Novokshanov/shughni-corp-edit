import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: #f0f4f8;
`;

const Message = styled.p`
  color: #1e90ff;
  font-size: 1.6em;
  text-align: center;
  margin-bottom: 40px;
  max-width: 500px;
`;

const LoginBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  display: block;
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
`;

const apiBaseUrl = 'https://novokshanov-shughni-corp-edit-975b.twc1.net';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${apiBaseUrl}/login', { username, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
      navigate('/editor');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <LoginPage>
      <Message>You have come to the website for editors of the Shughni language corpus. Please log in to start editing texts.</Message>
      <LoginBox>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <Button type="submit">Log In</Button>
        </form>
      </LoginBox>
    </LoginPage>
  );
};

export default Login;
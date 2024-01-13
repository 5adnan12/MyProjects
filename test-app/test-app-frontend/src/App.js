import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username,
        password,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <Wrapper>
      <Title>Register</Title>
      <FormGroup>
        <Label>Username:</Label>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Password:</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormGroup>
      <Button onClick={handleRegister}>Register</Button>
    </Wrapper>
  );
}

export default Register;

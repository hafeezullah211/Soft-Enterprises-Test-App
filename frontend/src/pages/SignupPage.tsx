import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormField from '../components/FormField';
import PasswordField from '../components/PasswordField';

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const userData = { name, email, password };
  
    try {
      console.log('Sending user data:', userData);
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      console.log('Response:', response.data);
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Error response:', err.response.data);
        setError(err.response.data.message || 'Failed to create account');
      } else {
        console.error('Error:', err);
        setError('Failed to create account');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign Up</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <FormField label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <PasswordField label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;

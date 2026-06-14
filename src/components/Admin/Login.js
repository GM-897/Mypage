import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../hooks/useApi';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1C1C27;
`;

const Card = styled.div`
  background: #171721;
  border: 1px solid #854CE6;
  border-radius: 16px;
  padding: 48px 40px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  color: #F2F3F4;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: #1C1C27;
  border: 1px solid #854CE6;
  border-radius: 8px;
  color: #F2F3F4;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  &::placeholder { color: #b1b2b3; }
  &:focus { border-color: #a66ef5; }
`;

const Button = styled.button`
  padding: 12px;
  background: #854CE6;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #6b3bbf; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Error = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  margin: 0;
`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await apiPost('/admin/login', { email, password });
      localStorage.setItem('admin_token', token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Title>Admin Login</Title>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Error>{error}</Error>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </Page>
  );
};

export default AdminLogin;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserProfile } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputField/inputField';
import Checkbox from '../Checkbox/Checkbox';
import SubmitButton from '../SubmitButton/SubmitButton';
import "./Form.css";

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, rememberMe }));
  };

  useEffect(() => {
    if (authStatus === 'succeeded' && token && !user) {
      if (rememberMe) {
        localStorage.setItem('token', token);
      }
      if (token) {
        dispatch(fetchUserProfile());
      }
    }
  }, [authStatus, token, rememberMe, dispatch]);

  useEffect(() => {
    if (authStatus === 'succeeded' && user) {
      navigate('/dashboard');
    }
  }, [authStatus, user, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Checkbox
        label="Remember Me"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />
      <SubmitButton value="Sign In" />
    </form>
  );
}

export default Form;
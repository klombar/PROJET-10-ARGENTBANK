import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserProfile } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Form from "../Form/Form";
import InputField from '../InputField/inputField';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import "./Modale.css";

function Modale() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);
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
  }, [authStatus, token, rememberMe, dispatch, user]);

  useEffect(() => {
    if (authStatus === 'succeeded' && user) {
      navigate('/dashboard');
    }
  }, [authStatus, user, navigate]);

  return (
    <div className="modale">
      <i className="fa fa-user-circle"></i>
      <h1>Sign In</h1>
      {error && <p className="error">{error}</p>}
      <Form handleSubmit={handleSubmit} className="modal-form">
        <InputField
          className="signIn-inputField"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          className="signIn-inputField"
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
        <Button value="Sign In" onClick={handleSubmit} className={"signIn-Modale-Submit"}/>
      </Form>
    </div>
  );
}

export default Modale;
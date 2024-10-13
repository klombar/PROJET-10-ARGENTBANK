import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserProfile } from '../../redux/authSlice'; // Ajout de la fonction fetchUserProfile
import { useNavigate } from 'react-router-dom';
import "./Form.css";

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); // Récupération des données utilisateur
  const navigate = useNavigate();

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Utilisation d'useEffect pour récupérer le profil utilisateur après la connexion
  useEffect(() => {
    if (authStatus === 'succeeded' && token) {
      // Si le token est disponible, on peut récupérer le profil utilisateur
      if (rememberMe) {
        localStorage.setItem('token', token); // Sauvegarde du token dans le localStorage si Remember Me est activé
      }
      // Déclenche l'action pour récupérer le profil utilisateur
      dispatch(fetchUserProfile());
    }
  }, [authStatus, token, rememberMe, dispatch]);

  // Gestion de la redirection après connexion réussie
  useEffect(() => {
    if (authStatus === 'succeeded' && user) {
      // Redirection vers le dashboard après récupération du profil utilisateur
      navigate('/dashboard');
      dispatch(fetchUserProfile());
    }
  }, [authStatus, user, navigate, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="signIn-Modale-Email-Wrapper">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="SignIn-Modale-Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="signIn-Modale-Password-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="signIn-Modale-Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="signIn-Modale-RememberMe-wrapper">
        <input
          type="checkbox"
          id="signIn-Modale-RememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="signIn-Modale-RememberMe">Remember Me</label>
      </div>
      <div className="signIn-Modale-Submit-Wrapper">
        <input type="submit" id="signIn-Modale-Submit" value="Sign In" />
      </div>

      {/* Gestion des états d'authentification */}
      {authStatus === 'loading' && <p>Loading...</p>}
      {authStatus === 'failed' && <p>Error: {authError}</p>}
      {authStatus === 'succeeded' && <p>Connexion réussie !</p>}

      {/* Affichage des données utilisateur */}
      {user && (
        <div>
          <h3>Profil utilisateur :</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}

export default Form;
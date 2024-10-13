import { useEffect } from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, logout } from "../../redux/authSlice"; 

function Nav() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const userFirstName = useSelector((state) => state.auth.user?.firstName); 
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const authStatus = useSelector((state) => state.auth.status); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile()); 
    } 
  }, [isAuthenticated, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/Sign-In"); 
  };

  return (
    <>
      {authStatus === 'loading' ? (
        <p>Loading...</p>  
      ) : (
        <div className={isAuthenticated ? "header-nav-connected" : "header-nav"}>
        <Link to={isAuthenticated ? "/profile" : "/Sign-In"} className="header-nav-link">
          <p className={`${isAuthenticated ? "connected-user-color" : "no-connected-user-color"}`}>{isAuthenticated ? `${userFirstName}_${userLastName}` : "Sign In"}</p> {/* Affiche le nom & prénom de l'utilisateur */}
          <i className={`fa-solid fa-user-circle ${isAuthenticated ? "icon-authenticated" : "icon-default"}`}></i>
        </Link>
        <i className={isAuthenticated ? "fa-solid fa-gear" : ""}></i>
        <i onClick={handleLogout} className={isAuthenticated ? "fa-solid fa-power-off" : ""}></i>
        </div>
      )}
    </>
  );
}

export default Nav;
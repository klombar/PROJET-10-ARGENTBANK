import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, logout } from "../../redux/authSlice";
import "./Nav.css";

function Nav() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const userFirstName = useSelector((state) => state.auth.user?.firstName);
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const userNameState = useSelector((state) => state.auth.userName);
  const authStatus = useSelector((state) => state.auth.status); 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch]);

 
  const userName = userNameState || `${userFirstName}_${userLastName}`;


  const displayUserName = isAuthenticated ? userName : "Sign In";

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/"); 
  };

  return (
    <>
      {authStatus === 'loading' ? (
        <p>Loading...</p>  
      ) : (
        <div className={isAuthenticated ? "header-nav-connected" : "header-nav"}>
          <Link to={isAuthenticated ? "/dashboard" : "/sign-in"} className="header-nav-link">
            <i className={`fa-solid fa-user-circle ${isAuthenticated ? "icon-authenticated" : "icon-default"}`}></i>
            <p className={`${isAuthenticated ? "connected-user-color" : "no-connected-user-color"}`}>
              {displayUserName}
            </p> 
          </Link>
          
          {isAuthenticated && (
            <p onClick={handleLogout} className="nav-logout">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Nav;

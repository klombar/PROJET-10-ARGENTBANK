import "./Dashboard.css";
import "../../components/Button/Button.css"
import Main from "../../Layout/Main/Main";
import "../../Layout/Main/Main.css";
import Collapse from "../../components/Collapse/Collapse";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import InputField from "../../components/InputField/inputField";
import Button from "../../components/Button/Button"; // Import du nouveau composant Button
import { setUserName } from "../../redux/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../redux/authSlice"; 
import PropTypes from 'prop-types';

function Dashboard() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const userFirstName = useSelector((state) => state.auth.user?.firstName); 
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileFetched, setProfileFetched] = useState(false);
  const [localUserName, setLocalUserName] = useState(`${userFirstName}_${userLastName}`);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // Si l'utilisateur n'est pas authentifié, redirige vers la page d'accueil
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated && !profileFetched) {
      dispatch(fetchUserProfile());
      setProfileFetched(true);
    } 
  }, [isAuthenticated, profileFetched, dispatch]);

  useEffect(() => {
    if (isAuthenticated && userFirstName && userLastName) {
      setLocalUserName(`${userFirstName}_${userLastName}`);
    }
  }, [isAuthenticated, userFirstName, userLastName]);

  const handleUserNameChange = (e) => {
    setLocalUserName(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setUserName(localUserName));
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <Main className={"Main"}>
        {!isFormVisible && (
          <div className="dashBoard-header">
          <h1>Welcome Back <br />{userFirstName} {userLastName} !</h1>
          <Button value="Edit Name" onClick={toggleFormVisibility} className={"open-Edit-User-button"}/>
          </div>
        )}

        {isFormVisible && (
          <form className="dashBoard-form" onSubmit={handleSubmit}>
            <h1>Edit User Info</h1>
            <InputField 
              className="dashBoard-inputField-wrapper" 
              type="text" 
              label="User Name :" 
              name="User Name" 
              value={localUserName}
              onChange={handleUserNameChange}
            />
            <InputField
              className="dashBoard-inputField-wrapper" 
              type="text" 
              label="First Name :" 
              name="First Name" 
              value={isAuthenticated ? `${userFirstName}` : " "}
              onChange={handleUserNameChange}
              disabled
            />
            <InputField 
              className="dashBoard-inputField-wrapper" 
              type="text" 
              label="Last Name :" 
              name="Last Name" 
              value={isAuthenticated ? `${userLastName}` : " "}
              onChange={handleUserNameChange}
              disabled
            />
            <div className="dashBoard-submitButton-wrapper">
              <Button value="Save" onClick={handleSubmit} className={"signIn-Modale-Submit"}/>
              <Button value="Cancel" onClick={toggleFormVisibility} className={"signIn-Modale-Submit"}/>
            </div>
          </form>
        )}

        <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}>
          <TransactionTable />
        </Collapse>

        <Collapse title={"Argent Bank Savings (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}>
          <TransactionTable />
        </Collapse>

        <Collapse title={"Argent Bank Business (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}>
          <TransactionTable />
        </Collapse>
      </Main>
    </>
  );
}

Dashboard.propTypes = {
  onUserNameChange: PropTypes.func,
};

export default Dashboard;
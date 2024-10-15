import "./Dashboard.css";
import Main from "../../Layout/Main/Main";
import Collapse from "../../components/Collapse/Collapse";
import InputField from "../../components/InputField/inputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { setUserName } from "../../redux/authSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../redux/authSlice"; 
import PropTypes from 'prop-types';

function Dashboard() {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const userFirstName = useSelector((state) => state.auth.user?.firstName); 
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const dispatch = useDispatch();

  const [profileFetched, setProfileFetched] = useState(false);
  const [localUserName, setLocalUserName] = useState(`${userFirstName}_${userLastName}`); // État local

  useEffect(() => {
    if (isAuthenticated && !profileFetched) {
      dispatch(fetchUserProfile());
      setProfileFetched(true);
    } 
  }, [isAuthenticated, profileFetched, dispatch]);

  useEffect(() => {
    if (isAuthenticated && userFirstName && userLastName) {
      setLocalUserName(`${userFirstName}_${userLastName}`); // Met à jour si nécessaire
    }
  }, [isAuthenticated, userFirstName, userLastName]);

  const handleUserNameChange = (e) => {
    setLocalUserName(e.target.value); // Met à jour l'état local pour localUserName
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setUserName(localUserName)); // Envoie l'état localUserName à Redux
  };

  return (
    <>
      <Main>
        <form className="dashBoard-form" onSubmit={handleSubmit}>
          <h1>Edit User Info</h1>
          <InputField 
            className="dashBoard-inputField-wrapper" 
            type="text" 
            label="User Name :" 
            name="User Name" 
            value={localUserName} // Utilise localUserName
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
            <SubmitButton value="Save" type="submit"/>
            <SubmitButton value="Cancel"/>
          </div>
        </form>
        <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
        <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
        <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
      </Main>
    </>
  );
}

Dashboard.propTypes = {
  onUserNameChange: PropTypes.func,
};

export default Dashboard;
import "./Dashboard.css";
import Main from "../../Layout/Main/Main";
import Collapse from "../../components/Collapse/Collapse";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/inputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile} from "../../redux/authSlice"; 

function Dashboard() {

  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const userFirstName = useSelector((state) => state.auth.user?.firstName); 
  const userLastName = useSelector((state) => state.auth.user?.lastName);
  const dispatch = useDispatch();

  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !profileFetched) {
      dispatch(fetchUserProfile());
      setProfileFetched(true); // Marque le profil comme récupéré
    } 
  }, [isAuthenticated, profileFetched, dispatch]);

  return (
   <>
   <Main>
    <Form className="dashBoard-form">
      <h1>Edit User Info</h1>
      <InputField 
      className="dashBoard-inputField-wrapper" 
      type="text" 
      label="User Name :" 
      name="User Name" 
      value={isAuthenticated ? `${userFirstName}_${userLastName}` : " "}
      />
      <InputField
       className="dashBoard-inputField-wrapper" 
       type="text" 
       label="First Name :" 
       name="First Name" 
       value={isAuthenticated ? `${userFirstName}` : " "}
       disabled
       />
      <InputField 
      className="dashBoard-inputField-wrapper" 
      type="text" 
      label="Last Name :" 
      name="Last Name" 
      value={isAuthenticated ? `${userLastName}` : " "}
      disabled
      />
      <div className="dashBoard-submitButton-wrapper">
        <SubmitButton value="Save"/>
        <SubmitButton value="Cancel"/>
      </div>
    </Form>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
   </Main>
   </>
  );
}  

export default Dashboard;
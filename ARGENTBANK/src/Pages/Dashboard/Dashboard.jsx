import "./Dashboard.css";
import Main from "../../Layout/Main/Main";
import Collapse from "../../components/Collapse/Collapse";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/inputField";

function Dashboard() {
  return (
   <>
   <Main>
    <Form>
      <InputField type="text" label="User Name" name="User Name" value="Tony_Stark"/>
      <InputField type="text" label="First Name" name="First Name" value="Tony"/>
      <InputField type="text" label="Last Name" name="Last Name" value="Stark"/>
    </Form>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
   </Main>
   </>
  );
}  

export default Dashboard;
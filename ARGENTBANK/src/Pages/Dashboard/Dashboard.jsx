import "./Dashboard.css";
import Main from "../../Layout/Main/Main";
import Collapse from "../../components/Collapse/Collapse";
import Edit from "../../components/Edit/Edit";

function Dashboard() {
  return (
   <>
   <Main>
    <Edit title="Edit User Info" username="" firstname="" lastname=""/>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
    <Collapse title={"Argent Bank Checking (x3448)"} amount={"$48,098.43"} subtitle={"Available balance"}/>
   </Main>
   </>
  );
}  

export default Dashboard;
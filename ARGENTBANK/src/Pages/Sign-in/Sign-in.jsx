import "./Sign-in.css"
import Modale from "../../components/Modale/Modale"
import Main from "../../Layout/Main/Main"

function SignIn() {
   return(
      <>
      <Main>
         <div className="main-signin-background">
            <Modale />
         </div>
      </Main>
      </>
   )
}

export default SignIn;
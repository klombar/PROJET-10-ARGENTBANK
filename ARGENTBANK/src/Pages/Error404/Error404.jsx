import "./Error404.css"
import Main from "../../Layout/Main/Main"
import "../../Layout/Main/Main.css"

function Error404() {
      return (
         <Main className={"Main"}>
         <div className="error404">
               <h1 className="error404-title">404</h1>
               <p className="error404-subtitle">Hey there buddy ! it seems like you lost your road,</p><br/>
               <p className="error404-subtitle">click on the logo to return to the homepage.</p>
         </div>
         </Main>
      );
}


export default Error404;
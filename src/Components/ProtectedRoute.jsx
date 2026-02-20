import { Navigate } from "react-router-dom";

const ProtectedRoute = ({isLoggedin,children})=>{
    if(!isLoggedin){
        return <Navigate to="/" replace />  ;
    }



    return children;
}

export default ProtectedRoute;



// REPLACE: This adds a new entry to the browser’s history.So if the user clicks the browser’s Back button, 
//they’ll go back to the protected route (like /checkout) — which may not be desirable/if they weren’t allowed there.
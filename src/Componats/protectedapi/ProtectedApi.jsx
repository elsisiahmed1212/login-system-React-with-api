import { Navigate } from "react-router-dom";

function ProtectedApi({children}) {
    if (localStorage.getItem('userToken')) {
        return children
    }
    else return <Navigate to={'/login'}></Navigate>
}

export default ProtectedApi;
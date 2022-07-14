import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { removeUserData } from "../../api/util";

export default function Logout(){

    useEffect(()=> {
        removeUserData();
    },[])
    
    return(
        <Navigate to="/login" replace={true}/>
    );
};
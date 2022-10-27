import { useEffect, useState } from "react";
import firebase from "../firebase";

function useAuth() {
    const [ loggeduser, setLoggedUser ] = useState(null);

        useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                setLoggedUser(user);
            } else {
                setLoggedUser(null);
            }
        });
        
        return() => unsubscribe;
    }, []);
    
    return loggeduser;
}

export default useAuth;
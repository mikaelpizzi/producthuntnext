import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";
import useAuth from "../hooks/useAuth";

const MyApp = props => {

    const user = useAuth();
    console.log('LOGGED IN:', user);

    const { Component, pageProps } = props;

    return(
        <FirebaseContext.Provider
            value={{
                firebase,
                user
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}

export default MyApp;
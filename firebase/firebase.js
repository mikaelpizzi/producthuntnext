import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        if (!getApps.length) {
            initializeApp(firebaseConfig);
        }
    }
}

const firebase = new Firebase();

export default firebase;
import app from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
    }

    // Register a new user
    async register(name, email, password) {
            const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

            return await newUser.user.updateProfile({
                displayName : name
            })
    }
}

const firebase = new Firebase();
export default firebase;
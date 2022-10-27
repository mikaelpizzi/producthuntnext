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
        // try {
            const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

            return await newUser.user.updateProfile({
                displayName : name
            })
        // } catch (error) {
        //     console.error('ERROR: There was an error when creating user', error.message );
        // }

    }
}

const firebase = new Firebase();
export default firebase;
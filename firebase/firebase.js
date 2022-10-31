import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // Register a new user
    async register(name, email, password) {
            const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

            return await newUser.user.updateProfile({
                displayName : name
            })
    }

    // Log in an user
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    // Log out user
    async logout() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;
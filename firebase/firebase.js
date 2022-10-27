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

    // Registra un usuario
    async register(nombre, email, password) {
        try {
            const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);

            return await nuevoUsuario.user.updateProfile({
                displayName : nombre
            })
        } catch (error) {
            console.error('ERROR: There was an error when creating user', error.message );
        }

    }
}

const firebase = new Firebase();
export default firebase;
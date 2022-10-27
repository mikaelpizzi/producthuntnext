export default function validateLogin(values) {
    let errors = {};

    // Validate email
    if (!values.email) {
        errors.email = 'The email is required';
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        errors.email = 'Invalid email';
    }

    // Validate password
    if (!values.password) {
        errors.password = 'The password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
}

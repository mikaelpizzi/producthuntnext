export default function validateCreateAccount(values) {
    let errors = {};

    // Validate name
    if (!values.name) {
        errors.name = 'Name is required';
    }

    
    // Validate company
    if (!values.company) {
        errors.company = 'Company name is required';
    }

    
    // Validate url
    if (!values.url) {
        errors.url = 'URL is required';
    } else if ( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ){
        errors.url = 'Invalid URL';
    }

    // Validate description
    if (!values.description) {
        errors.description = 'Add a product description';
    }
    
    return errors;
}

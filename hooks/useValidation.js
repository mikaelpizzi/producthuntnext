import { useState } from "react";

const useValidation = (initialState, validate, fn) => {

    const [ values, setValues ] = useState(initialState);
    const [ errors, setErrors ] = useState({});
    const [ submitform, setSubmitForm ] = useState(false);

    useEffect(() => {
      if (submitform) {
        const noErrors = Object.keys(errors).length === 0;

        if (noErrors) {
            fn(); // Function that runs in component
        }

        setSubmitForm(false);
      }
    }, []);

    // Function that runs as the user types
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    // Function that runs when the user submits
    const handleSubmit = e => {
        e.preventDefault();

        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitForm(true);
    }
    

    return {
        values,
        errors,
        submitform,
        handleSubmit,
        handleChange
    }
}
 
export default useValidation;
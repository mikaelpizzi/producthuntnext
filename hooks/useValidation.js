import { useState } from "react";

const useValidation = (initialState, validate, fn) => {

    const [ values, setValues ] = useState(initialState);
    const [ errors, setErrors ] = useState({});
    const [ submitform, setSubmitForm ] = useState(false);

    useEffect(() => {
      if (submitform) {
        const noErrors = Object.keys(errors).length === 0;

        if (noErrors) {
            fn(); // Function that executes in component
        }

        setSubmitForm(false);
      }
    }, []);
    

    return (  );
}
 
export default useValidation;
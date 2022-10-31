import Layout from '../components/layout/Layout'
import { Error, Field, Form, InputSubmit } from '../components/ui/Form'
import { css } from '@emotion/react'
import firebase, { FirebaseContext } from '../firebase'
import Router, { useRouter } from 'next/router'
import FileUploader from 'react-firebase-file-uploader'
import Error404 from '../components/layout/404'
// Validation
import useValidation from '../hooks/useValidation'
import validateCreateProduct from '../validation/validateCreateProduct'
import { useContext, useState } from 'react'
import ErrorMessage from '../components/ui/ErrorMessage'

    const INITIAL_STATE = {
        name: '',
        company: '',
        image: '',
        url: '',
        description: ''
    }

export default function NewProduct() {

    // Images state
    const [ imagename, setImageName ] = useState('');
    const [ uploading, setUploading ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ imageurl, setImageUrl ] = useState('');

    const [ error, setError ] = useState(false);

    const { values,
            errors,
            handleSubmit,
            handleChange,
            handleBlur
    } = useValidation(INITIAL_STATE, validateCreateProduct, createProduct);

    const { name, company, url, description } = values;

    // Routing hook for redirect
    const router = useRouter();

    // Context with Firebase CRUD operations
    const { user, firebase } = useContext(FirebaseContext);

    async function createProduct() {
        // If user is not authenticated, take him to login
        if (!user) {
            return router.push('/login');
        }

        // Create new product object
        const product = {
            name,
            company,
            url,
            imageurl,
            description,
            votes: 0,
            comments: [],
            created: Date.now(),
            creator: {
                id: user.uid,
                name: user.displayName
            }
        }

        // Insert new product in database
        firebase.db.collection('products').add(product);

        return router.push('/');
    }

    // Handle image submit functions
    const handleUploadStart = () => {
        setProgress(0);
        setUploading(true);
    }
  
    const handleProgress = progress => setProgress({ progress });
  
    const handleUploadError = error => {
        setUploading(error);
        console.error('ERROR:', error);
    };
  
    const handleUploadSuccess = name => {
        setProgress(100);
        setUploading(false);
        setImageName(name);
        firebase
            .storage
            .ref("products")
            .child(name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              setImageUrl(url);
            } );
    };
    
  return (
    <div>
      <Layout>
        { !user ? <Error404 /> : (
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                        font-family: 'PT Sans', sans-serif;
                    `}
                >New Product</h1>
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                <fieldset>
                    <legend>General Information</legend>

                    <Field>
                        <label htmlFor='name'>Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        
                    </Field>

                    { errors.name && <Error>{errors.name}</Error> }

                    <Field>
                        <label htmlFor='company'>Company</label>
                        <input
                            type="text"
                            id="company"
                            placeholder="Company name"
                            name="company"
                            value={company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        
                    </Field>

                    { errors.company && <Error>{errors.company}</Error> }

                    <Field>
                        <label htmlFor='image'>Image</label>
                        <FileUploader
                            accept="image/*"
                            id="image"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage.ref('products')}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                        />
                        
                    </Field>

                    <Field>
                        <label htmlFor='url'>URL</label>
                        <input
                            type="url"
                            id="url"
                            placeholder="Product URL"
                            name="url"
                            value={url}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        
                    </Field>

                    { errors.url && <Error>{errors.url}</Error> }

                </fieldset>

                <fieldset>
                    <legend>About Your Product</legend>

                    <Field>
                        <label htmlFor='url'>Description</label>
                        <textarea
                            id="description"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        
                    </Field>

                    { errors.description && <Error>{errors.description}</Error> }

                </fieldset>


                    { error && <Error>{error}</Error> }

                    <InputSubmit
                        type="submit"
                        value="Create Product"
                    />
                </Form>
            </>
        )}
        
      </Layout>
    </div>
  )
}

import Layout from '../components/layout/Layout'
import { Error, Field, Form, InputSubmit } from '../components/ui/Form'
import { css } from "@emotion/react"
import firebase from '../firebase'
// Validation
import useValidation from '../hooks/useValidation'
import validateCreateProduct from '../validation/validateCreateProduct'
import { useState } from 'react'
import ErrorMessage from '../components/ui/ErrorMessage'
import Router from 'next/router'

    const INITIAL_STATE = {
        name: '',
        company: '',
        // image: '',
        url: '',
        description: ''
    }

export default function NewProduct() {

  const [ error, setError ] = useState(false);

  const { values,
          errors,
          handleSubmit,
          handleChange,
          handleBlur
  } = useValidation(INITIAL_STATE, validateCreateProduct, createAccount);

  const { name, company, url, description } = values;

  async function createAccount() {
     
  }

  return (
    <div>
      <Layout>
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

            {/* <Field>
                <label htmlFor='image'>Image</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    value={image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                
            </Field>

            { errors.image && <Error>{errors.image}</Error> } */}

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
      </Layout>
    </div>
  )
}

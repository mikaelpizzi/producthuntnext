import Layout from '../components/layout/Layout'
import { Error, Field, Form, InputSubmit } from '../components/ui/Form'
import { css } from "@emotion/react"
import firebase from '../firebase'
// Validation
import useValidation from '../hooks/useValidation'
import validateCreateAccount from '../validation/validateCreateAccount'
import { useState } from 'react'
import ErrorMessage from '../components/ui/ErrorMessage'
import Router from 'next/router'

    const INITIAL_STATE = {
        name: '',
        email: '',
        password: ''
    }

export default function CreateAccount() {

    const [ error, setError ] = useState(false);

    const { values,
            errors,
            handleSubmit,
            handleChange,
            handleBlur
    } = useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

    const { name, email, password } = values;

    async function createAccount() {
        try {
            await firebase.register(name, email, password);
            Router.push('/');
        } catch (error) {
            console.error('ERROR: There was an error when creating user', error.message );
            setError(error.message);
        }
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
        >Create Account</h1>
        <Form
            onSubmit={handleSubmit}
            noValidate
        >
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
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Field>

            { errors.email && <Error>{errors.email}</Error> }

            <Field>
                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Your Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Field>

            { errors.password && <Error>{errors.password}</Error> }

            { error && <Error><ErrorMessage message="The email address is already in use by another account" /></Error> }

            <InputSubmit
                type="submit"
                value="Create Account"
            />
        </Form>
      </Layout>
    </div>
  )
}

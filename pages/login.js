import Layout from '../components/layout/Layout'
import { Error, Field, Form, InputSubmit } from '../components/ui/Form'
import { css } from "@emotion/react"
import firebase from '../firebase'
// Validation
import useValidation from '../hooks/useValidation'
import validateLogin from '../validation/validateLogin'
import { useState } from 'react'
import ErrorMessage from '../components/ui/ErrorMessage'
import Router from 'next/router'

    const INITIAL_STATE = {
        email: '',
        password: ''
    }


export default function Login() {

  const [ error, setError ] = useState(false);

  const { values,
          errors,
          handleSubmit,
          handleChange,
          handleBlur
  } = useValidation(INITIAL_STATE, validateLogin, login);

  const { email, password } = values;

  function login() {
    console.log('loggin in...');
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
        >Log in</h1>
        <Form
            onSubmit={handleSubmit}
            noValidate
        >

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
                value="Log in"
            />
        </Form>
      </Layout>
    </div>
  )
}

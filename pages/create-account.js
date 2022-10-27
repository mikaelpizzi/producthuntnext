import Layout from '../components/layout/Layout'
import { Error, Field, Form, InputSubmit } from '../components/ui/Form'
import { css } from "@emotion/react"
import firebase from '../firebase'
// Validation
import useValidation from '../hooks/useValidation'
import validateCreateAccount from '../validation/validateCreateAccount'

export default function CreateAccount() {

    const INITIAL_STATE = {
        name: '',
        email: '',
        password: ''
    }
    const { values,
            errors,
            handleSubmit,
            handleChange,
            handleBlur
    } = useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

    const { name, email, password } = values;

    async function createAccount() {
        try {
            firebase.register(name, email, password);
        } catch (error) {
            console.error('There was an error when creating user', error );
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

            <InputSubmit
                type="submit"
                value="Create Account"
            />
        </Form>
      </Layout>
    </div>
  )
}

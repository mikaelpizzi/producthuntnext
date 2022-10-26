import Layout from '../components/layout/Layout'
import { Field, Form, InputSubmit } from '../components/ui/Form'
import { css } from "@emotion/react"
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
            submitform,
            handleSubmit,
            handleChange
    } = useValidation(INITIAL_STATE, validateCreateAccount, createAccount);

    const { name, email, password } = values;

    function createAccount() {
        console.log('Creating account...');
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
                />
            </Field>

            <Field>
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
            </Field>

            <Field>
                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Your Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            </Field>

            <InputSubmit
                type="submit"
                value="Create Account"
            />
        </Form>
      </Layout>
    </div>
  )
}

import Layout from '../components/layout/Layout'

export default function CreateAccount() {
  return (
    <div>
      <Layout>
        <h1>Create Account</h1>
        <form>
            <div>
                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    name="name"
                />
            </div>

            <div>
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    name="email"
                />
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Your Password"
                    name="password"
                />
            </div>

            <input
                type="submit"
                value="Create Account"
            />
        </form>
      </Layout>
    </div>
  )
}

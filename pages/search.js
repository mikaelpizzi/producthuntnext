import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'

export default function Search() {

  const router = useRouter();
  
  const { query: { q }} = router;
  
  console.log(q);

  return (
    <div>
      <Layout>
        <h1>Search</h1>
      </Layout>
    </div>
  )
}

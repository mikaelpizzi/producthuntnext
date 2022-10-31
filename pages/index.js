import { useContext, useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { FirebaseContext } from '../firebase';

export default function Home() {

  const [ products, setProducts ] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      firebase.db.collection('products').orderBy('created', 'desc').onSnapshot(handleSnapshot);
    }
    getProducts();
  }, []);

  function handleSnapshot(snapshot) {
    const products = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });

    setProducts(products);
  }

  return (
    <div>
      <Layout>
        <h1>Home</h1>
      </Layout>
    </div>
  )
}

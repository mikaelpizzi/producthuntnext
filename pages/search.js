import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout'
import ProductDetails from '../components/layout/ProductDetails';
import useProducts from '../hooks/useProducts';

export default function Search() {

  const router = useRouter();
  const { query: { q }} = router;
  
  // All the products
  const { products } = useProducts('created');
  const [ result, setResult ] = useState([]);

  useEffect(() => {
    const query = q.toLowerCase();

    const filter = products.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.creator.name.toLowerCase().includes(query)
      )
    });

    setResult(filter);
  }, [q, products]);

  return (
    <div>
      <Layout>
        <div className='listado-productos'>
          <div className='contenedor'>
            <ul className='bg-white'>
              { result.map(product => (
                <ProductDetails 
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";

const Product = () => {
    // Component state
    const [ product, setProduct ] = useState({});
    const [ error, setError ] = useState(false);

    // Routing for getting actual id
    const router = useRouter();
    const { query: {id}} = router;

    // Firebase context
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();

                if (product.exists) {
                    setProduct( product.data() ); 
                } else {
                    setError(true);
                }

            }
            getProduct();
        }
    }, [id])

    return (  
        <Layout>
            { error && <Error404 /> }
        </Layout>
    );
}
 
export default Product;
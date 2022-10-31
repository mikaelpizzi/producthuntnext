import React from 'react';
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import styled from '@emotion/styled';

const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

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

    if (Object.keys(product).length === 0) return 'Loading...';

    const { comments, created, description, company, name, url, imageurl, votes } = product;


    return (  
        <Layout>
            <>
                { error && <Error404 /> }
                
                <div className="contenedor">
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    ></h1>

                    <ProductContainer>
                        <div>
                            1
                        </div>

                        <aside>
                            2
                        </aside>
                    </ProductContainer>
                </div>
            </>
        </Layout>
    );
}
 
export default Product;
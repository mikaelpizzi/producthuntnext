import React from 'react';
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { css } from "@emotion/react";
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Field, InputSubmit } from '../../components/ui/Form';

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
                            <p>Posted {formatDistanceToNow(new Date(created))} ago</p>

                            <img src={imageurl} />
                            <p>{description}</p>

                            <h2>Add a comment</h2>
                            <form>
                                <Field>
                                    <input 
                                        type="text"
                                        name="message"
                                    />
                                </Field>

                                <InputSubmit
                                    type="submit"
                                    value="Add comment"
                                />
                            </form>

                            <h2
                                css={css`
                                    margin: 2rem 0;
                                `}
                            >Comments</h2>
                            { comments.map(comment => (
                                <li>
                                    <p>{comment.name}</p>
                                    <p>Written by: {comment.userName}</p>
                                </li>
                            ))}
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
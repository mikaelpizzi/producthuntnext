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
import Button from '../../components/ui/Button';

const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const ProductCreator = styled.p`
    padding: .5rem 2rem;
    background-color: #da552f;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

const Product = () => {
    // Component state
    const [ product, setProduct ] = useState({});
    const [ error, setError ] = useState(false);
    const [ comment, saveComment ] = useState({});
    const [ consultDB, setConsultDB ] = useState(true);

    // Routing for getting actual product id
    const router = useRouter();
    const { query: {id}} = router;

    // Firebase context
    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultDB) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();

                if (product.exists) {
                    setProduct( product.data() ); 
                    setConsultDB(false);
                } else {
                    setError(true);
                    setConsultDB(false);
                }

            }
            getProduct();
        }
    }, [id])

    if (Object.keys(product).length === 0 && !error) return 'Loading...';

    const { comments, created, description, company, name, url, imageurl, votes, creator, hasVoted } = product;

    // Administrate and validate upvotes
    const upvoteProduct = () => {
        if (!user) {
            return router.push('/login'); // Security layer
        }

        // Get and add new vote
        const newTotal = votes + 1;

        // Verify is actual user has voted in this product
        if (hasVoted.includes(user.uid)) return;

        // Save the id of the user who have voted
        const newHasVoted = [...hasVoted, user.uid];

        // Update db
        firebase.db.collection('products').doc(id).update({ 
            votes: newTotal, 
            hasVoted: newHasVoted 
        });
        
        // Update state
        setProduct({
            ...product,
            votes: newTotal,
            hasVoted: newHasVoted 
        })

        setConsultDB(true); // When voting, then consult db
    }

    // Functions to create comments
    const onChangeComment = e => {
        saveComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    // Identify if the comment is from the product creator
    const isCreator = id => {
        if (creator.id === id) {
            return true;
        }

        return false;
    } 

    const addComment = e => {
        e.preventDefault();

        if (!user) {
            return router.push('/login'); // Security layer
        }

        // Extra info to comment
        comment.userId = user.uid;
        comment.userName= user.displayName;

        // Get copy of comments and add it to the array
        const newComments = [...comments, comment];

        // Update db
        firebase.db.collection('products').doc(id).update({
            comments: newComments
        });

        // Update state
        setProduct({
            ...product,
            comments: newComments
        })

        setConsultDB(true); // When commenting, then consult db
    }

    // Function that checks if product creator is the same that the actual authenticated user
    const canDelete = () => {
        if (!user) return false;

        if (creator.id === user.uid) {
            return true;
        }
    }

    // Delete a product from database
    const deleteProduct = async () => {
        if (!user) {
            return router.push('/login'); // Security layer
        }

        if (creator.id !== user.uid) {
            return router.push('/');
        }

        try {
            await firebase.db.collection('products').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    return (  
        <Layout>
            <>
                { error ? <Error404 /> : (
                    <>
                        <div className="contenedor">
                            <h1
                                css={css`
                                    text-align: center;
                                    margin-top: 5rem;
                                `}
                            >{name}</h1>

                            <ProductContainer>
                                <div>
                                    <p>Posted {formatDistanceToNow(new Date(created))} ago</p>
                                    <p>By: <strong>{creator.name}</strong> of {company}</p>

                                    <img src={imageurl} />
                                    <p>{description}</p>

                                    { user && (
                                        <>
                                            <h2>Add a comment</h2>
                                            <form
                                                onSubmit={addComment}
                                            >
                                                <Field>
                                                    <input 
                                                        type="text"
                                                        name="message"
                                                        onChange={onChangeComment}
                                                    />
                                                </Field>

                                                <InputSubmit
                                                    type="submit"
                                                    value="Add comment"
                                                />
                                            </form>
                                        </>
                                    ) }

                                    <h2
                                        css={css`
                                            margin: 2rem 0;
                                        `}
                                    >Comments</h2>

                                    { comments.length === 0 ? "No comments yet" : (
                                        <ul>
                                        { comments.map((comment, i) => (
                                            <li
                                                key={`${comment.userId}-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comment.message}</p>
                                                <p>
                                                    Written by: 
                                                    <span
                                                        css={css`
                                                            font-weight: bold;
                                                        `}
                                                    >{' '}{comment.userName}</span>
                                                </p>
                                                { isCreator(comment.userId) && <ProductCreator>Creator</ProductCreator> }
                                            </li>
                                        ))}
                                        </ul>
                                    )}
                                    
                                </div>

                                <aside>
                                    <Button
                                        target="_blank"
                                        bgColor="#da552f"
                                        href={url}
                                    >Visit URL</Button>

                                    <div
                                        css={css`
                                            margin-top: 5rem;
                                        `}
                                    >
                                        <p
                                            css={css`
                                                text-align: center;
                                            `}
                                        >{votes} Upvote</p>
                                        
                                        { user && 
                                        <Button
                                            onClick={upvoteProduct}
                                        >Vote</Button> }
                                    </div>
                                </aside>
                            </ProductContainer>

                            { canDelete() && 
                                <Button
                                    onClick={deleteProduct}
                                >Delete Product</Button>
                            }
                        </div>
                    </>
                ) }
                

            </>
        </Layout>
    );
}
 
export default Product;
import Link from "next/link";
import Search from "../ui/Search";
import Navigation from "./Navigation";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../ui/Button";
import React, { useContext } from 'react';
import { FirebaseContext } from "../../firebase";

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;

    &:hover {
        cursor: pointer;
    }
`

const Header = () => {

    const { firebase, user } = useContext(FirebaseContext);

    return (  
        <header
            css={css`
                border-bottom: 2px solid var(--gray3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Link href='/'>
                        <Logo>P</Logo>
                    </Link>

                    <Search />

                    <Navigation />
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >

                { user ? (
                    <>
                        <p
                            css={css`
                                margin-right: 2rem;
                            `}
                        >Hi: <strong>{user.displayName}</strong></p>

                        <Button
                            bgColor={"#da552f"}
                            onClick={() => firebase.logout()}
                        >Log out</Button>
                    </>

                ) : (
                    <>
                        <Link href="/login">
                            <Button
                                bgColor={"#da552f"}
                            >Log in</Button>
                        </Link>

                        <Link href="/create-account">
                            <Button>Sign up</Button>
                        </Link>
                    </>
                ) }

                </div>
            </HeaderContainer>
        </header>
    );
}
 
export default Header;
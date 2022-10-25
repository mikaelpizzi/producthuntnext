import Link from "next/link";
import Search from "../ui/Search";
import Navigation from "./Navigation";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

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
`

const Header = () => {
    return (  
        <header
            css={css`
                border-bottom: 2px solid var(--gray3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <div>
                    <Link href='/'>
                        <Logo>P</Logo>
                    </Link>

                    <Search />

                    <Navigation />
                </div>

                <div>
                    <p>Hi: Ei</p>

                    <button type="button">Log out</button>

                    <Link href="/">Log in</Link>
                    <Link href="/">Sign up</Link>
                </div>
            </HeaderContainer>
        </header>
    );
}
 
export default Header;
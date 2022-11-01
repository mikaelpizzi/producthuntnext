import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useState } from "react";

const InputText = styled.input`
    border: 1px solid var(--gray3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/search.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1.75px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`;

const Search = () => {

    const [ search, setSearch ] = useState('');

    const searchProduct = e => {
        e.preventDefault();

        if (search.trim() === '') return;

        // Redirect user
        

    }

    return (  
        <form
            css={css`
                position: relative;
            `}
            onSubmit={searchProduct}
        >
            <InputText 
                type="text"
                placeholder="Find Products"
                onChange={e => setSearch(e.target.value)}
            />

            <InputSubmit type="submit">Search</InputSubmit>
        </form>
    );
}
 
export default Search;
import { css } from "@emotion/react";

const Error404 = () => {
    return (  
        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
            `}
        >This product does not exist</h1>
    );
}
 
export default Error404;
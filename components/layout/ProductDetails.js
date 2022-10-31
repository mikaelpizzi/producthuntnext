import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Image = styled.img`
    width: 200px;
`;

const ProductDetails = ({ product }) => {

    const { id, comments, created, description, company, name, url, imageurl, votes } = product;

    return (  
        <li>
            <div>
                <div>
                    <Image src={imageurl} />
                </div>

                <div>
                    <h1>{name}</h1>

                    <p>{description}</p>

                    <div>
                        <img src="/static/img/comment.png" />
                        <p>{comments.length} comments</p>

                        <p>Posted {formatDistanceToNow(new Date(created))} ago</p>
                    </div>
                </div>
            </div>

            <div>
                <div>&#9650;</div>
                <p>{votes}</p>
            </div>
        </li>
    );
}
 
export default ProductDetails;
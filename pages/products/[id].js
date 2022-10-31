import { useRouter } from "next/router";
import { useEffect } from "react";

const Product = () => {
    // Routing for getting actual id
    const router = useRouter();
    const { query: {id}} = router;

    useEffect(() => {
        if (id) {
            console.log('There is something!');
        }
    }, [id])
    return (  
        <h1>From {id}</h1>
    );
}
 
export default Product;
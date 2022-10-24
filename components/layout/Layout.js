import Link from 'next/link';
import React from 'react'

const Layout = props => {
    return (  
        <>
            <h1>Header</h1>

            <nav>
                <Link href='/'>Home</Link>
                <Link href='/about'>About Us</Link>
            </nav>

            <main>
                {props.children}
            </main>
        </>
    );
}
 
export default Layout;
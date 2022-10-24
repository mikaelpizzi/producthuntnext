import Link from "next/link";
import Search from "../ui/Search";
import Navigation from "./Navigation";

const Header = () => {
    return (  
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Search />

                    <Navigation />
                </div>

                <div>
                    <p>Hi: Ei</p>

                    <button type="button">Log out</button>

                    <Link href="/">Log in</Link>
                    <Link href="/">Sign up</Link>
                </div>
            </div>
        </header>
    );
}
 
export default Header;
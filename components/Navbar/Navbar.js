import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import Button from "../UI/Button";
import useWindowDimension from "../hooks/useWindowDimension";

import Logo from "../../public/logo.svg";
import Cross from "../../public/cross.svg";
import MenuLogo from "../../public/menu.svg";

function Navbar() {

    const [click, setClick] = useState(false);
    const [className, setClassName] = useState(false);

    const { idToken, setIdToken, cartArray } = useAuth();

    const router = useRouter();

    function clickHandler() {
        router.replace("/signup");
    }

    function logoutHandler() {
        setIdToken("");
        router.replace("/");
    }

    const windowSize = useWindowDimension();

    const fullScreenNavbar = windowSize > 768;

    function navbarOpenHandler() {
        setClick(true);
    }

    function navbarCloseHandler() {
        setClick(false);
    }

    useEffect(() => {
        setClassName(true);
        const timer = setTimeout(() => {
            setClassName(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [cartArray]);

    const productLink = <li className={`list-none ${router.pathname == "/products" ? "text-logo-green font-bold" : ""}`}>
        <Link href="/products" >Products</Link>
    </li>

    const cartLink = <li className="list-none"  >
        <Link href="/cart" >
            <div className={`hover:cursor-pointer ${router.pathname == "/cart" ? "text-logo-green font-bold " : ""}`}>
                <p>Card<span className={"border ml-1 px-2 py-1 rounded-lg bg-white"}>{cartArray.length}</span></p>
            </div>
        </Link>
    </li>

    return (
        <>
            {fullScreenNavbar && <nav className="sticky top-0 bg-light-white z-10">
                <div className="flex justify-between items-center mx-auto w-11/12">

                    <Link href="/" >
                        <a><Image src={Logo} width="72" height="72" priority="true" /></a>
                    </Link>

                    <div className="flex justify-between gap-4 items-center">

                        {cartLink}

                        {productLink}

                        {idToken &&
                            <li className={`list-none ${router.pathname == "/my-products" ? "text-logo-green font-bold" : ""}`}>
                                <Link href="/my-products" >My Products</Link>
                            </li>}

                        {!idToken && <Link href="/signin" >Sign In</Link>}

                        {!idToken && <Button title="Sign Up" onClick={clickHandler} />}

                        {idToken &&
                            <li className={`list-none ${router.pathname == "/create-product" ? "text-logo-green font-bold" : ""}`}>
                                <Link href="/create-product" >Create Product</Link>
                            </li>}

                        {idToken && <Button title="Log Out" onClick={logoutHandler} />}

                    </div>
                </div>
            </nav>}


            {
                !fullScreenNavbar && <nav className={`sticky top-0 bg-light-white z-10 ${click ? "min-h-screen flex items-center" : ""}`}>
                    <div className="flex justify-between items-center mx-auto w-11/12">

                        {!click && <Link href="/" ><a><Image src={Logo} width="72" height="72" /></a></Link>}

                        {!click && <button onClick={navbarOpenHandler} ><Image src={MenuLogo} /></button>}

                        {click && <button className="fixed top-5 right-5" onClick={navbarCloseHandler} ><Image src={Cross} width="48" height="48" /></button>}

                        {click && <div className="grid mx-auto justify-items-center gap-10">

                            {cartLink}

                            {productLink}

                            {idToken &&
                                <li className={`list-none ${router.pathname == "/my-products" ? "text-logo-green font-bold" : ""}`}>
                                    <Link href="/my-products" >My Products</Link>
                                </li>}

                            {!idToken && <Link href="/signin" >Sign In</Link>}

                            {!idToken && <Button title="Sign Up" onClick={clickHandler} />}

                            {idToken &&
                                <li className={`list-none ${router.pathname == "/create-product" ? "text-logo-green font-bold" : ""}`}>
                                    <Link href="/create-product" >Create Product</Link>
                                </li>}

                            {idToken && <Button title="Log Out" onClick={logoutHandler} />}

                        </div>}
                    </div>
                </nav>
            }

        </>
    );
}

export default Navbar;

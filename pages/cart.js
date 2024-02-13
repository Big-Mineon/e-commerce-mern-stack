import Head from "next/head";

import Cart from "../components/Product/Cart";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../components/context/AuthContext";

function CartPage() {

    const { cartArray } = useAuth();

    return (
        <>
            <Head>
                <title>Your Cart | {cartArray.length}</title>
                <meta name="description" content="You can order everything with just one click." />
            </Head>

            <Navbar />
            <Cart />
        </>
    );
}

export default CartPage;

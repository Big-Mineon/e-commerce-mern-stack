import Head from "next/head";

import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Product/Products";

function ProductsPage({ data }) {
    return (
        <>
            <Head>
                <title>Products</title>
                <meta name="description" content="Look for what product you want when you want." />
            </Head>

            <Navbar />
            <Products allProducts={data} />
        </>
    );
}

export default ProductsPage;


export async function getStaticProps() {

    const response = await fetch("https://e-commerce-ad64f-default-rtdb.europe-west1.firebasedatabase.app/products.json");
    const data = await response.json();

    return {
        props: {
            data
        }
    }
}
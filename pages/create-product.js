import Head from "next/head";

import Navbar from "../components/Navbar/Navbar";
import CreateProduct from "../components/Product/CreateProduct";

function CreateProductPage() {
    return (
        <>
            <Head>
                <title>Create Product</title>
                <meta name="description" content="To start selling your product we are here." />
            </Head>

            <Navbar />
            <CreateProduct />
        </>
    );
}

export default CreateProductPage;

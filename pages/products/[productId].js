import Head from "next/head";

import Navbar from "../../components/Navbar/Navbar";
import SingleProduct from "../../components/Product/SingleProduct";

function SingleProductPage({ data }) {

    return (
        <>
            <Head>
                <title>{data[1]?.productName}</title>
            </Head>

            <Navbar />
            <SingleProduct data={data} />
        </>
    );
}

export default SingleProductPage;

export async function getStaticPaths() {

    const response = await fetch("https://e-commerce-ad64f-default-rtdb.europe-west1.firebasedatabase.app/products.json");
    const data = await response.json();
    const dataArray = Object.entries(data);

    return {
        paths: dataArray.map(item => {
            return { params: { productId: item[1].id } }
        }),
        fallback: false
    }
}

export async function getStaticProps(context) {

    const { productId } = context.params;

    const response = await fetch("https://e-commerce-ad64f-default-rtdb.europe-west1.firebasedatabase.app/products.json");
    const data = await response.json();
    const dataArray = Object.entries(data);

    const [productArray] = dataArray.filter(item => item[1].id === productId);

    return {
        props: {
            data: productArray
        }
    }
}
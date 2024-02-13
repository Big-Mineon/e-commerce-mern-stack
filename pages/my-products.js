import { useAuth } from "../components/context/AuthContext";
import Head from "next/head";

import BackgroundModal from "../components/UI/BackgroundModal";
import MyProducts from "../components/Product/MyProducts";
import Navbar from "../components/Navbar/Navbar";

function MyProductsPage({ productData }) {

    const { openModal, closeModal } = useAuth();


    if (openModal && !closeModal) return (
        <BackgroundModal>
            <Head>
                <title>My products</title>
                <meta name="description" content="See everything belongs to you." />
            </Head>
            <Navbar />
            <MyProducts productData={productData} />
        </BackgroundModal>
    )

    if (!openModal || closeModal) return (
        <>
            <Head>
                <title>My products</title>
                <meta name="description" content="See everything belongs to you." />
            </Head>
            <Navbar />
            <MyProducts productData={productData} />
        </>
    );
}

export async function getStaticProps() {

    const response = await fetch("https://e-commerce-ad64f-default-rtdb.europe-west1.firebasedatabase.app/products.json");
    const data = await response.json();

    return {
        props: {
            productData: data
        }
    }
}

export default MyProductsPage;



import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import AuthLayout from "../UI/AuthLayout";

function MyProducts({ productData }) {

    const [clickedId, setClickedId] = useState();

    const router = useRouter();

    if (clickedId) router.push("/products/" + clickedId);

    const { userData, idToken, setOpenModal, setCloseModal, setEraseItem } = useAuth();

    if (productData == undefined || productData == null) return <AuthLayout description="No products to be shown" />;

    const userDataArray = Object.values(userData);

    const [signedInUser] = userDataArray.filter(user => user.id === idToken);

    const myProducts = Object.values(productData);

    const showMyProducts = myProducts.filter(product => product.email === signedInUser?.email);

    function productEraseHandler(id) {
        setOpenModal(true);
        setCloseModal(false);
        const allItems = Object.entries(productData);

        const [deletedItem] = allItems.filter(item => item[1]?.id === id);
        setEraseItem(deletedItem[0]);
    }

    return (
        <div className="w-11/12 mx-auto mt-12">
            <ul className="lg:grid lg:grid-cols-4 md:grid md:grid-cols-3 lg:gap-12 md:gap-6">
                {showMyProducts.reverse().map(product => {
                    return <li className="border-2 mb-10 px-5 py-4 rounded-lg bg-white w-full md:grid md:grid-rows md:items-end lg:grid lg:grid-rows lg:items-end" key={product.id}>
                        <img onClick={() => setClickedId(product.id)} className="max-w-full max-h-32 mx-auto hover:cursor-pointer" src={product.productImage} alt={product.productName} />
                        <p className="text-xl font-semibold mt-3">{product.productName}</p>
                        <p className="italic font-normal my-3">{product.productPrice}$</p>
                        <button onClick={() => productEraseHandler(product.id)} className="px-5 py-4 bg-red-500 rounded-md text-white hover:bg-red-700 active:bg-red-700">Delete</button>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default MyProducts;

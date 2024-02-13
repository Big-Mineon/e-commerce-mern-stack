import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

import AuthLayout from "../UI/AuthLayout";
import Button from "../UI/Button";

function Products({ allProducts }) {

    const [clickedId, setClickedId] = useState();
    const [negativeNumber, setNegativeNumber] = useState(false);
    const [count, setCount] = useState({});

    const { setCartArray, cartArray, setAllProducts } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (clickedId !== undefined) router.push("/products/" + clickedId);
    }, [clickedId]);

    useEffect(() => {
        if (negativeNumber) scrollTo(0, 0);
    }, [negativeNumber]);

    useEffect(() => {
        setAllProducts(allProducts);
    }, [allProducts]);

    if (allProducts == undefined || allProducts == null) return <AuthLayout description="No products to be shown" />

    const products = Object.values(allProducts);

    function addToCartHandler(id) {
        const [addedProduct] = products.reverse().filter(product => product.id === id);

        if (count[id]?.c < 1) {
            setNegativeNumber(true);
            return;
        }

        if (count[id]?.c >= 1) setNegativeNumber(false);

        addedProduct["number"] = count[id]?.c ? count[id]?.c : 1;
        setCartArray([...cartArray, addedProduct]);
    }

    function increaseHandler(id) {
        setCount({
            ...count,
            [id]: {
                id: id,
                c: count[id]?.id == id ? count[id].c + 1 : 2,
            }
        });
    }

    function decreaseHandler(id) {
        setCount({
            ...count,
            [id]: {
                id: id,
                c: count[id]?.id == id ? count[id].c - 1 : 1,
            }
        });
    }


    return (
        <>
            {negativeNumber && <AuthLayout description="You must select a positive number." />}

            <div className="w-11/12 mx-auto mt-12">

                <ul className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 lg:gap-12 md:gap-6">
                    {products.reverse().map(product => {
                        return <li className="border-2 mb-10 px-5 py-4 rounded-lg bg-white w-full md:grid md:grid-rows md:items-end lg:grid lg:grid-rows lg:items-end" key={product.id}>
                            <img onClick={() => setClickedId(product.id)} className="max-w-full max-h-32 mx-auto hover:cursor-pointer" src={product.productImage} alt={product.productName} />
                            <p className="text-xl font-semibold mt-3">{product.productName}</p>
                            <p className="italic font-normal my-3">{product.productPrice}$</p>
                            <div className="flex justify-between items-center">
                                <Button title="Add to Cart" onClick={(e) => {
                                    e.stopPropagation();
                                    return addToCartHandler(product.id);
                                }} />
                                <div>
                                    <button onClick={() => decreaseHandler(product.id)} className="bg-slate-300 px-3 py-1 rounded-lg">-</button>
                                    <span className="mx-2">{count[product.id]?.c ? count[product.id]?.c : 1}</span>
                                    <button onClick={() => increaseHandler(product.id)} className="bg-slate-300 px-3 py-1 rounded-lg">+</button>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default Products;

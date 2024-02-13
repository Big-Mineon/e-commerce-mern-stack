import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

import AuthLayout from "../UI/AuthLayout";
import Button from "../UI/Button";

import Delete from "../../public/delete.svg";

function Cart() {

    const [click, setClick] = useState(false);

    const { cartArray, idToken, setCartArray, setUniqueArray, uniqueArray } = useAuth();
    let sumofPrices = 0;

    function productDeleteHandler(id) {
        const deletedItem = cartArray.filter(item => item.id !== id);
        setCartArray(deletedItem);
    }

    function productSubmitHandler(e) {
        e.preventDefault();
        setClick(true);
        if (idToken) setCartArray([]);
    }

    useEffect(() => {
        scrollTo(0, 0);
        const timer = setTimeout(() => {
            setClick(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, [click]);

    useEffect(() => {
        setUniqueArray(cartArray.filter(function (item, pos, self) {
            return self.indexOf(item) === pos;
        }));
    }, [cartArray]);

    return (
        <>
            {!idToken && click && <AuthLayout description="You must signed in to proceed." />}
            {idToken && click && <AuthLayout description="You have successfully ordered." />}

            <form onSubmit={productSubmitHandler} className="w-11/12 mx-auto my-5">
                <h3 className="font-bold text-xl my-5">Your Cart</h3>
                <ul className="bg-white rounded-lg">
                    {uniqueArray.map(item => {
                        let itemPrice = ((item.productPrice) * (item.number)).toFixed(2);
                        console.log(itemPrice);
                        sumofPrices = sumofPrices + Number(itemPrice);

                        return <li className="grid-cols-5 grid gap-5 items-center border-b-2 w-full px-3 py-5 md:p-2 lg:p-2 md:pl-16 lg:pl" key={item.id}>
                            <img className=" md:max-h-32 lg:max-h-40 max-h-36 rounded-lg" src={item.productImage} alt={item.productName} />
                            <p className="">{item.productName}</p>
                            <span className="text-center">{item.number} {item.number === 1 ? "Piece" : "Pieces"}</span>

                            <p className="italic">{itemPrice}$</p>
                            <button onClick={(e) => {
                                e.preventDefault();
                                return productDeleteHandler(item.id);
                            }} className="border py-2 lg:w-1/3 md:w-1/2 rounded-lg bg-red-500 lg:py-4 hover:bg-red-400"><Image src={Delete} priority="true" alt="deleteButton" /></button>

                        </li>
                    })}
                </ul>
                <div className="my-5 flex justify-between">
                    <p>Total Price:</p>
                    <p className="italic">{sumofPrices.toFixed(2)}$</p>
                </div>
                <Button title="Checkout" />
            </form>

        </>
    );
}

export default Cart;

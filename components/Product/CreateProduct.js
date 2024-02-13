import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import Router, { useRouter } from "next/router";

import AuthLayout from "../UI/AuthLayout";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";

function CreateProduct() {

    const [error, setError] = useState(false);
    const [click, setClick] = useState(false);
    const [validate, setValidate] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { createProductText, setCreateProductText, idToken, userName } = useAuth();

    const router = useRouter();

    function createProductHandler(e) {
        e.preventDefault();
        setClick(true);
        if (createProductText.productName !== ""
            && createProductText.productDescription !== ""
            && createProductText.productPrice !== ""
            && createProductText.category !== ""
            && createProductText.productImage !== "") setValidate(true);
    }

    useEffect(() => {
        async function postCreateProduct() {
            await fetch("https://e-commerce-ad64f-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
                method: "POST",
                body: JSON.stringify({
                    ...createProductText,
                    username: userName,
                    id: Math.random().toString(16).slice(2)
                }),
                headers: { "Content-Type": "application/json" }
            });
        }
        if (validate) postCreateProduct();
        if (validate) setShowSuccess(true);

        delete createProductText.password;

    }, [validate]);

    useEffect(() => {
        if (click === true) {
            if (createProductText.productName === ""
                || createProductText.productDescription === ""
                || createProductText.productPrice === ""
                || createProductText.category === ""
                || createProductText.productImage === "") {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 1500);
            }
            setValidate(false);
        }

        if (validate === true) {
            setCreateProductText({
                ...createProductText,
                productName: "",
                productDescription: "",
                productPrice: "",
                productImage: "",
                category: "",
            });
        }

        if (click === true) setClick(false);

    }, [click]);


    function selectChangeHandler(e) {
        setCreateProductText({
            ...createProductText,
            category: e.target.value
        });
    }

    function gotoProductsHandler() {
        router.replace("/products");
    }

    useEffect(() => {
        const { pathname } = Router;

        if (pathname == "/create-product" && (idToken === undefined || idToken === "")) {
            setTimeout(() => {
                Router.push("/");
            }, 2500);
        }
    }, []);

    if (idToken === undefined || idToken === "") return <AuthLayout description="You are not signed in. You are being redirect to the main page. Please wait..." />


    return (
        <>
            {!showSuccess && <form className="grid w-11/12 mx-auto md:w-7/12 lg:w-5/12" noValidate onSubmit={createProductHandler}>
                <h2 className="text-2xl font-bold pt-6">Add Product</h2>
                <p className="py-4 text-light-gray">To start selling, all you need is a name, price and an image.</p>

                <select onChange={selectChangeHandler} name="category" id="category" className="mb-6 px-2 py-4 border bg-white focus:outline-none focus:border-dark-green focus:ring-dark-green focus:ring-1 rounded-lg">
                    <option value="">Choose a category</option>
                    <option value="food" key="Food">Food</option>
                    <option value="jewelry" key="Jewelry">Jewelry</option>
                    <option value="drink" key="Drink">Drink</option>
                    <option value="cosmetic" key="Cosmetic">Cosmetic</option>
                </select>

                <Input type="text" placeholder="Product name" id="productName" value={createProductText.productName} />
                <p className="pt-1 pb-6 text-sm italic">Give your product a short and clear name.</p>

                <Input type="text" placeholder="Product description" id="productDescription" value={createProductText.productDescription} />
                <p className="pt-1 pb-6 text-sm italic">Give your product a short and clear description.</p>

                <Input type="number" placeholder="Product price" id="productPrice" value={createProductText.productPrice} />
                <p className="pt-1 pb-6 text-sm italic">Give your product an affordable price.($)</p>

                <Input type="text" placeholder="Product image" id="productImage" value={createProductText.productImage} />
                <p className="pt-1 pb-6 text-sm italic">Provide your product's image as URL.</p>

                <Button title="Publish" />

                {error && <Modal error="You must fill out all the fields." />}

            </form>}

            {showSuccess && <div className="grid w-11/12 mx-auto md:w-7/12 lg:w-5/12 bg-logo-green text-md font-bold  p-10 rounded-lg mt-6">
                <p className="text-center">You have successfully published your product.</p>
                <div className="w-full mt-6 mx-auto text-center md:w-6/12 lg:w-6/12">
                    <Button title="Go to Products page" onClick={gotoProductsHandler} />
                </div>
            </div>}
        </>
    );
}

export default CreateProduct;

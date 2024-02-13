import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

import Link from "next/link";
import Image from "next/image";

import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";

import Logo from "../../public/logo.svg";

function Signup() {

    const [click, setClick] = useState(false);
    const [validation, setValidation] = useState(false);

    const { inputText, validate, setInputText } = useAuth();

    const router = useRouter();

    function signupHandler(e) {
        e.preventDefault();
        setClick(true);
        if (validate.name !== false && validate.email !== false && validate.password !== false) setValidation(true);
        console.log(inputText);
    }

    useEffect(() => {
        if (validation) {
            router.replace("/");
            setInputText({
                name: "",
                email: "",
                password: ""
            })
        }
    }, [validation]);

    useEffect(() => {
        async function sendData() {
            await fetch("https://e-commerce-ad64f-default-rtdb.europe-west1.firebasedatabase.app/users.json", {
                method: "POST",
                body: JSON.stringify({
                    ...inputText,
                    id: Math.random().toString(16).slice(2)
                }),
                headers: { "Content-Type": "application/json" }
            });
        }
        if (validation) sendData();

    }, [validation]);

    return (
        <div className="min-h-screen flex items-center bg-right bg-[url('../public/backImage.jpeg')]">
            <div className="bg-white rounded-lg border-2 p-5 w-10/12 mx-auto md:w-6/12 lg:w-5/12">
                <span className="hover:cursor-pointer">
                    <Link href="/" ><a><Image src={Logo} width="96" height="96" priority="true" /></a></Link>
                </span>

                <div className="pb-8 space-y-4">
                    <h4 className="text-3xl font-semibold">Sign Up</h4>
                    <p className="text-md">Start your journey</p>
                </div>

                <form onSubmit={signupHandler} className="grid w-full gap-6" noValidate>
                    <Input type="text" placeholder="Your name" id="name" value={inputText.name} />
                    <Input type="email" placeholder="Your email" id="email" value={inputText.email} />
                    <Input type="password" placeholder="Your password" id="password" value={inputText.password} />
                    <Button title="Sign Up" />
                </form>

                <p className="pt-6 italic font-light">Already have an account?
                    <span className="text-green-400 underline font-semibold ml-2"><Link href="/signin" >Get Started</Link></span>
                </p>

            </div>

            {click && (validate.name === false || validate.email === false || validate.password === false) && <Modal error="Please fill out all the fields correctly." />}
        </div>
    );
}

export default Signup;

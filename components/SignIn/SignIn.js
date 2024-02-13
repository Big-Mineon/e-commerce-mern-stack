import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";

import Logo from "../../public/logo.svg";

function SignIn({ data }) {

    const [click, setClick] = useState(false);
    const [validation, setValidation] = useState(false);
    const [logUser, setLogUser] = useState(false);
    const [reset, setReset] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const [userPasswordIsWrong, setUserPasswordIsWrong] = useState(false);

    const { inputText, validate, setInputText, setIdToken, setUserName, setUserData } = useAuth();

    const router = useRouter();

    useEffect(() => {
        setUserData(data);
    }, [data]);

    function signinHandler(e) {
        e.preventDefault();
        setClick(true);
        setLogUser(prev => !prev)
        if (validate.email !== false && validate.password !== false) setValidation(true);
    }

    useEffect(() => {
        const users = Object.entries(data);
        if (validation) {
            const [user] = users.filter(user => user[1].email == inputText.email);

            if (user === undefined) {
                setUserNotFound(true);
                setTimeout(() => {
                    setUserNotFound(false);
                }, 1500);
                return;
            }
            if (user[1]?.password == inputText.password && user[1]?.email == inputText.email) {
                setIdToken(user[1].id);
                setUserName(user[1].name);
                setReset(true);
                router.replace("/");
            } else {
                setUserPasswordIsWrong(true);
                setTimeout(() => {
                    setUserPasswordIsWrong(false);
                }, 1500);
            }
        }
    }, [validation, logUser]);

    useEffect(() => {
        if (reset) {
            setInputText({
                name: "",
                email: "",
                password: ""
            })
        }
    }, [reset]);

    return (
        <div className="min-h-screen flex items-center bg-right bg-[url('../public/backImage.jpeg')]">
            <div className="bg-white rounded-lg border-2 p-5 w-10/12 mx-auto md:w-6/12 lg:w-5/12">
                <span className="hover:cursor-pointer">
                    <Link href="/" ><a><Image src={Logo} width="96" height="96" priority="true" /></a></Link>
                </span>

                <div className="pb-8 space-y-4">
                    <h4 className="text-3xl font-semibold">Sign In</h4>
                    <p className="text-md">Go to Shopify</p>
                </div>

                <form onSubmit={signinHandler} className="grid w-full gap-6" noValidate>
                    <Input type="email" placeholder="Your email" id="email" value={inputText.email} />
                    <Input type="password" placeholder="Your password" id="password" value={inputText.password} />
                    <Button title="Sign In" />
                </form>

                <p className="pt-6 italic font-light">Are you new to Shopify?
                    <span className="text-green-400 underline font-semibold ml-2"><Link href="/signup" >Get Started</Link></span>
                </p>

            </div>

            {click && (validate.email === false || validate.password === false) && <Modal error="Please fill out all the fields correctly." />}
            {click && userNotFound && <Modal error="You are not registered!" />}
            {click && userPasswordIsWrong && <Modal error="Your password is not correct!" />}

        </div>
    );
}

export default SignIn;
